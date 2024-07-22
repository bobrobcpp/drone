import { WebSocketServer, WebSocket } from 'ws';
import TG from '../dataGenerators/TelemetryGenerator/TelemetryGenerator';
import { CustomWebSocket } from '../types/CustomWebSocket.types';

const wss = new WebSocketServer({ port: 4000, path: '/telemetry' });

wss.on('connection', (ws: CustomWebSocket) => {
    console.log('Client connected');
    ws.dataStream = initializeStream(ws);

    ws.on('close', () => {
        console.log('Client disconnected');
        if (ws.dataStream) {
            ws.dataStream.destroy();
        }
    });

    wss.on('error', (error) => {
        console.error('WebSocket Server Error:', error);
    });
});

export function initializeStream(ws: CustomWebSocket) {
    const dataStream = new TG({ objectMode: true });

    dataStream.on('data', (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            try {
                ws.send(data);
            } catch (error) {
                console.error('Error sending data:', error);
            }
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

    return dataStream;
}

export function restartStream(ws, oldStream) {
    oldStream.removeAllListeners();
    oldStream.destroy();

    setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN) {
            try {
                const newStream = initializeStream(ws);
                ws.dataStream = newStream;
            } catch (error) {
                console.error('Error restarting stream:', error);
            }
        }
    }, 1000);
}

export { wss };
