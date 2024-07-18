import { WebSocketServer, WebSocket } from 'ws';
import TG from './TelemetryGenerator';

const wss = new WebSocketServer({ port: 3000, path: '/telemetry' });

function initializeStream(ws) {
    const dataStream = new TG({ objectMode: true });

    dataStream.on('data', (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            console.log('Sending data to client:', data);
            ws.send(data);
        }
    });

    dataStream.on('error', (error) => {
        console.error('Error in data stream', error);
        restartStream(ws, dataStream);
    });

    dataStream.on('end', () => {
        console.log('Stream ended');
        restartStream(ws, dataStream);
    });

    dataStream.on('close', () => {
        console.log('Stream closed');
    });

    dataStream.on('finish', () => {
        console.log('Stream finished');
    });

    return dataStream;
}

function restartStream(ws, oldStream) {
    console.log('Restarting data stream');
    oldStream.removeAllListeners();
    oldStream.destroy();

    // Short delay before restarting to avoid rapid restart loops
    setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN) {
            const newStream = initializeStream(ws);
            ws.dataStream = newStream; // Store reference to new stream
        }
    }, 1000);
}

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.dataStream = initializeStream(ws);

    ws.on('close', () => {
        console.log('Client disconnected');
        if (ws.dataStream) {
            ws.dataStream.destroy();
        }
    });
});