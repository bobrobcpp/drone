import SensorStream from './SensorStream';
import { SensorReading } from '../types/SensorTypes';
import { getCurrentTimestamp } from '../utils/TimeUtils';

export default class BatterySensor extends SensorStream {
    static simulatedBatteryValue: number;

    constructor() {
        super('Battery');
        BatterySensor.simulatedBatteryValue = 100;
    }

    generateReading(): SensorReading {
        return {
            sensorId: this.sensorType,
            timestamp: getCurrentTimestamp(),
            value: this.generateSimulatedBatteryValue(),
            unit: '%'
        };
    }

    generateSimulatedBatteryValue() {
        const doVeryRarely = Math.random() < 0.0001;
        if (doVeryRarely) {
            BatterySensor.simulatedBatteryValue -= 1;
        }
        return BatterySensor.simulatedBatteryValue;
    }

    getReadInterval(): number {
        return 1000;
    }
}