import SensorStream from './SensorStream';
import { SensorReading } from '../types/SensorTypes';
import { getCurrentTimestamp } from '../utils/TimeUtils';

export default class SpeedSensor extends SensorStream {
    constructor() {
        super('Speed');
    }

    generateReading(): SensorReading {
        return {
            sensorId: this.sensorType,
            timestamp: getCurrentTimestamp(),
            value: this.getRandomSpeed(),
            unit: 'm/s'
        };
    }

    getRandomSpeed = () => {
        const baseSpeed = 100;
        const variation = 20;
        return +(baseSpeed + Math.random() * variation * 2 - variation).toFixed(2);
    }

    getReadInterval(): number {
        return 1000;
    }
}