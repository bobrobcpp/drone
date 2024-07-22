// @ts-nocheck
import { Readable } from 'stream';
import TelemetryGenerator from './TelemetryGenerator';

jest.useFakeTimers();

describe('TelemetryGenerator', () => {
    let generator;

    beforeEach(() => {
        jest.spyOn(global, 'setInterval');
        generator = new TelemetryGenerator();
    });

    afterEach(() => {
        generator._destroy();
        jest.restoreAllMocks();
    });

    test('constructor initializes with correct values', () => {
        expect(generator._interval).toBeNull();
        expect(TelemetryGenerator.simulatedBatteryValue).toBe(100);
        expect(TelemetryGenerator.simulatedTemperatureValue).toBe(20);
    });

    test('_read method starts interval', () => {
        generator._read();
        expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 1000);
    });

    test('generateTelemetryData returns object with correct properties', () => {
        const data = generator.generateTelemetryData();
        expect(data).toHaveProperty('altitude');
        expect(data).toHaveProperty('gpsCoordinates');
        expect(data).toHaveProperty('temperature');
        expect(data).toHaveProperty('batteryLevel');
        expect(data).toHaveProperty('speed');
        expect(data).toHaveProperty('timestamp');
    });

    test('_destroy clears interval and calls super.destroy', () => {
        const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
        const superDestroySpy = jest.spyOn(Readable.prototype, 'destroy');
        generator._destroy();
        expect(clearIntervalSpy).toHaveBeenCalled();
        expect(superDestroySpy).toHaveBeenCalled();
    });
});