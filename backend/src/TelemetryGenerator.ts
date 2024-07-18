import { Readable } from 'stream';

export default class TelemetryGenerator extends Readable {
  static simulatedBatteryValue: number;
  constructor(options) {
    super(options);
    this._interval = null;
    TelemetryGenerator.simulatedBatteryValue = 100;
  }

  _read() {
    if (!this._interval) {
      this._interval = setInterval(() => {
        const telemetryData = this._generateTelemetryData();
        this.push(JSON.stringify(telemetryData));
      }, 1000);
    }
  }

  _generateTelemetryData() {
    return {
      altitude: this._generateAltitude(),
      gpsCoordinates: this._generateGPSCoordinates(),
      batteryLevel: this.generateSimulatedBatteryValue(),
      speed: this._generateSpeed(),
      timestamp: Date.now()
    };
  }

  _generateAltitude() {
    const baseAltitude = 0;
    const variation = 10;
    return +(baseAltitude + Math.random() * variation * 2 - variation).toFixed(2);
  }

  _generateGPSCoordinates() {
    const baseLat = 100;
    const baseLon = 100;
    const variation = 20;
    return {
      latitude: +(baseLat + Math.random() * variation * 2 - variation).toFixed(6),
      longitude: +(baseLon + Math.random() * variation * 2 - variation).toFixed(6)
    };
  }

  _generateBatteryLevel() {
    return Math.floor(Math.random() * 101);
  }

  generateSimulatedBatteryValue() {
    const doVeryRarely = Math.random() < 0.1;
    if (doVeryRarely) {
      TelemetryGenerator.simulatedBatteryValue -= 1;
    }
    return TelemetryGenerator.simulatedBatteryValue;
  }

  _generateSpeed() {
    const baseSpeed = 15;
    const variation = 5;
    return +(baseSpeed + Math.random() * variation * 2 - variation).toFixed(2);
  }

  destroy() {
    clearInterval(this._interval);
    super.destroy();
  }
}
