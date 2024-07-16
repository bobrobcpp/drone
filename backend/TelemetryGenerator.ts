const { Readable } = require('stream');

class TelemetryGenerator extends Readable {
    constructor(options) {
      super(options);
      this._interval = null;
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
        batteryLevel: this._generateBatteryLevel(),
        speed: this._generateSpeed()
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
      const variation = 2;
      return {
        latitude: +(baseLat + Math.random() * variation * 2 - variation).toFixed(6),
        longitude: +(baseLon + Math.random() * variation * 2 - variation).toFixed(6)
      };
    }
  
    _generateBatteryLevel() {
      return Math.floor(Math.random() * 101);
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

  module.exports = TelemetryGenerator;