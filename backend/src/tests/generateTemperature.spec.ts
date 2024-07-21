// @ts-nocheck
import { generateTemperature } from "../dataGenerators/generateTemperature/generateTemperature";

describe('generateTemperature', () => {
    beforeEach(() => {
        jest.spyOn(Math, 'random').mockReturnValue(0.05);
    });

    test('generateTemperature increases temperature over time', () => {
        const temp = generateTemperature(20);
        expect(temp).toBe(21);
    });

    test('generateTemperature resets to 20 if it goes over 60', () => {
        const temp = generateTemperature(61);
        expect(temp).toBe(20);
    });
});