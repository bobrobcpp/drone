import { Transform } from 'stream';
import { SensorReading } from '../types/SensorTypes';

export default class SensorDataCombiner extends Transform {
    private latestReadings: Map<string, SensorReading> = new Map();

    constructor() {
        super({ objectMode: true });
    }

    _transform(chunk: SensorReading, encoding: string, callback: Function) {
        this.latestReadings.set(chunk.sensorId, chunk);

        const combinedData = {
            timestamp: chunk.timestamp,
            readings: Array.from(this.latestReadings.values())
        };

        // Replacer function to handle BigInt values (e.g. timestamps)
        const replacer = (key, value) => typeof value === "bigint" ? { $bigint: value.toString() } : value;

        this.push(JSON.stringify(combinedData, replacer));
        callback();
    }
}