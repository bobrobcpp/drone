import { Readable } from 'stream';
import { SensorReading, SensorType } from '../types/SensorTypes';

export default abstract class SensorStream extends Readable {
    protected sensorType: SensorType;

    constructor(sensorType: SensorType, options = {}) {
        super({ ...options, objectMode: true });
        this.sensorType = sensorType;
    }

    _read() {
        const reading = this.generateReading();
        this.push(reading);
        setTimeout(() => this._read(), this.getReadInterval());
    }

    abstract generateReading(): SensorReading;
    abstract getReadInterval(): number;
}