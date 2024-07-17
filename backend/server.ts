const express = require('express');
const http = require('http');
const WebSocketPackage = require('ws');
const TG = require('./TelemetryGenerator.ts')

const app = express();
const server = http.createServer(app);
const wss = new WebSocketPackage.Server({ server });

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

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});