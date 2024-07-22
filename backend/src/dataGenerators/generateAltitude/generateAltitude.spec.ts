// @ts-nocheck
import { generateAltitude } from "./generateAltitude";

describe('generateAltitude', () => {
    test('generateAltitude returns number within expected range', () => {
        const altitude = generateAltitude();
        expect(altitude).toBeGreaterThanOrEqual(16);
        expect(altitude).toBeLessThanOrEqual(24);
    });
});