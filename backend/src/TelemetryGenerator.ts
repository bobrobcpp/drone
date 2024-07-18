import { Readable } from 'stream';

export default class TelemetryGenerator extends Readable {
  static simulatedBatteryValue: number;
  static simulatedTemperatureValue: number;
  _interval: NodeJS.Timeout | null;
  constructor(options) {
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
      altitude: this.generateAltitude(),
      gpsCoordinates: this.generateGPSCoordinates(),
      temperature: this.generateTemperatureValue(),
      batteryLevel: this.generateSimulatedBatteryValue(),
      speed: this.generateSpeed(),
      timestamp: Date.now()
    };
  }

  generateAltitude() {
    const baseAltitude = 20;
    const variation = 4;
    return +(baseAltitude + Math.random() * variation * 2 - variation).toFixed(2);
  }

  generateGPSCoordinates() {
    const baseLat = 200;
    const baseLon = 400;
    const variation = 50;
    return {
      latitude: +(baseLat + Math.random() * variation * 2 - variation).toFixed(6),
      longitude: +(baseLon + Math.random() * variation * 2 - variation).toFixed(6)
    };
  }

  generateTemperatureValue() {
    // Simulate temperature increasing over time but reset to 20 when overheated
    const doRarely = Math.random() < 0.1;
    if (doRarely) {
      if (TelemetryGenerator.simulatedTemperatureValue > 60) {
        TelemetryGenerator.simulatedTemperatureValue = 20;
      } else {
        TelemetryGenerator.simulatedTemperatureValue += 1;
      }
    }
    return TelemetryGenerator.simulatedTemperatureValue;
  }

  generateSimulatedBatteryValue() {
    // Simulate battery level decreasing over time but reset to 100% when drained
    const doRarely = Math.random() < 0.1;
    if (doRarely) {
      if (TelemetryGenerator.simulatedBatteryValue < 0) {
        TelemetryGenerator.simulatedBatteryValue = 100;
      } else {
        TelemetryGenerator.simulatedBatteryValue -= 1;
      }
    }
    return TelemetryGenerator.simulatedBatteryValue;
  }

  generateSpeed() {
    const baseSpeed = 15;
    const variation = 2;
    return +(baseSpeed + Math.random() * variation * 2 - variation).toFixed(2);
  }

  _destroy() {
    clearInterval(this._interval);
    super.destroy();
  }
}
