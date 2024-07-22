// @ts-nocheck
import { generateSpeed } from "./generateSpeed";

describe('generateSpeed', () => {
    test('generateSpeed returns number within expected range', () => {
        const speed = generateSpeed();
        expect(speed).toBeGreaterThanOrEqual(13);
        expect(speed).toBeLessThanOrEqual(17);
    });
});