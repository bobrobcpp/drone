import { WebSocketServer } from 'ws';

import AltimeterSensor from './sensors/AltimeterSensor';
import BatterySensor from './sensors/BatterySensor';
import GpsSensor from './sensors/GpsSensor';
import SpeedSensor from './sensors/SpeedSensor';
import SensorDataCombiner from './combiners/SensorDataCombiner';

const wss = new WebSocketServer({ port: 3000 });

const altimeterSensor = new AltimeterSensor();
const batterySensor = new BatterySensor();
const gpsSensor = new GpsSensor();
const speedSensor = new SpeedSensor();

const dataCombiner = new SensorDataCombiner();

gpsSensor.pipe(dataCombiner);
altimeterSensor.pipe(dataCombiner);
gpsSensor.pipe(dataCombiner);
batterySensor.pipe(dataCombiner);
speedSensor.pipe(dataCombiner);

wss.on('connection', (ws) => {
    console.log('Client connected');

    dataCombiner.on('data', (combinedData) => {
        ws.send(combinedData);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        dataCombiner.destroy();
    });
});