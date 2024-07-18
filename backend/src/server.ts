import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import TG from './TelemetryGenerator'

const app = express();
const wss = new WebSocketServer({ port: 3000, path: '/telemetry' });

wss.on('connection', (ws) => {
    console.log('Client connected');

    const telemetryGenerator = new TG({ objectMode: true });

    const dataStream = telemetryGenerator;

    dataStream.on('data', (data) => {
        ws.send(data);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        telemetryGenerator.destroy();
    });
});