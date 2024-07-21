// @ts-nocheck
import { generateBatteryLevel } from "../dataGenerators/generateBatteryLevel/generateBatteryLevel";

describe('generateBatteryLevel', () => {
    beforeEach(() => {
        jest.spyOn(Math, 'random').mockReturnValue(0.05);
    });
    test('generateBatteryLevel decreases over time', () => {
        const batteryLevel = generateBatteryLevel(100);
        expect(batteryLevel).toBe(99);
    });
    test('generateBatteryLevel resets to 100 when it goes below 0', () => {
        const batteryLevel = generateBatteryLevel(0);
        expect(batteryLevel).toBe(100);
    });
});