import SensorStream from './SensorStream';
import { SensorReading } from '../types/SensorTypes';
import { getCurrentTimestamp } from '../utils/TimeUtils';

export default class AltimeterSensor extends SensorStream {
    constructor() {
        super('Altimeter');
    }

    generateReading(): SensorReading {
        return {
            sensorId: this.sensorType,
            timestamp: getCurrentTimestamp(),
            value: Math.random() * 100,
            unit: 'meters'
        };
    }

    getReadInterval(): number {
        return 1000;
    }
}