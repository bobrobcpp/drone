import { Readable } from 'stream';

import { generateAltitude } from './dataGenerators/generateAltitude';
import { generateGpsCoordinates } from './dataGenerators/generateGpsCoordinates';
import { generateTemperatureValue } from './dataGenerators/generateTemperature';
import { generateBatteryValue } from './dataGenerators/generateBatteryLevel';
import { generateSpeed } from './dataGenerators/generateSpeed';

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
        const telemetryData = this.generateTelemetryData();
        this.push(JSON.stringify(telemetryData));
      }, 1000);
    }
  }

  generateTelemetryData() {
    return {
      altitude: generateAltitude(),
      gpsCoordinates: generateGpsCoordinates(),
      temperature: generateTemperatureValue(TelemetryGenerator.simulatedTemperatureValue),
      batteryLevel: generateBatteryValue(TelemetryGenerator.simulatedBatteryValue),
      speed: generateSpeed(),
      timestamp: Date.now()
    };
  }

  _destroy() {
    clearInterval(this._interval);
    super.destroy();
  }
}
