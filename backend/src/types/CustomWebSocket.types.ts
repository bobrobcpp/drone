import { WebSocket } from 'ws';
import TG from '../dataGenerators/TelemetryGenerator/TelemetryGenerator';

export interface CustomWebSocket extends WebSocket {
    dataStream?: TG;
}