import SensorStream from './SensorStream';
import { SensorReading } from '../types/SensorTypes';
import { getCurrentTimestamp } from '../utils/TimeUtils';

export default class GpsSensor extends SensorStream {
    constructor() {
        super('Gps');
    }

    generateReading(): SensorReading {
        return {
            sensorId: this.sensorType,
            timestamp: getCurrentTimestamp(),
            value: this.generateGpsCoordinates(),
            unit: 'lat/lon'
        };
    }

    getReadInterval(): number {
        return 1000;
    }

    generateGpsCoordinates() {
        const baseLat = 100;
        const baseLon = 100;
        const variation = 20;
        return {
            latitude: +(baseLat + Math.random() * variation * 2 - variation).toFixed(6),
            longitude: +(baseLon + Math.random() * variation * 2 - variation).toFixed(6)
        };
    }
}