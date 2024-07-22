import { Readable } from 'stream';

import { SensorData } from '../../types/SensorData';

import { generateAltitude } from '../generateAltitude/generateAltitude';
import { generateGpsCoordinates } from '../generateGpsCoordinates/generateGpsCoordinates';
import { generateTemperature } from '../generateTemperature/generateTemperature';
import { generateBatteryLevel } from '../generateBatteryLevel/generateBatteryLevel';
import { generateSpeed } from '../generateSpeed/generateSpeed';

export default class TelemetryGenerator extends Readable {
  static simulatedBatteryValue: number;
  static simulatedTemperatureValue: number;
  _interval: string | number | NodeJS.Timeout | undefined; constructor(options) {
    super(options);
    this._interval = null;
    TelemetryGenerator.simulatedBatteryValue = 100;
    TelemetryGenerator.simulatedTemperatureValue = 20;
  }

  _read() {
    if (!this._interval) {
      this._interval = setInterval(() => {
        try {
          const telemetryData = this.generateTelemetryData();
          this.push(JSON.stringify(telemetryData));
        } catch (error) {
          this.emit('error', error);
        }
      }, 1000);
    }
  }

  generateTelemetryData(): SensorData {
    TelemetryGenerator.simulatedTemperatureValue = generateTemperature(TelemetryGenerator.simulatedTemperatureValue);
    TelemetryGenerator.simulatedBatteryValue = generateBatteryLevel(TelemetryGenerator.simulatedBatteryValue);
    return {
      altitude: generateAltitude(),
      gpsCoordinates: generateGpsCoordinates(),
      temperature: TelemetryGenerator.simulatedTemperatureValue,
      batteryLevel: TelemetryGenerator.simulatedBatteryValue,
      speed: generateSpeed(),
      timestamp: Date.now()
    };
  }

  _destroy() {
    clearInterval(this._interval);
    super.destroy();
  }
}
