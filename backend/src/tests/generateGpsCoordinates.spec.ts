//@ts-nocheck
import { generateGpsCoordinates } from "../dataGenerators/generateGpsCoordinates/generateGpsCoordinates";

test('generateGpsCoordinates returns object with latitude and longitude', () => {
    const coords = generateGpsCoordinates();
    expect(coords).toHaveProperty('latitude');
    expect(coords).toHaveProperty('longitude');
    expect(coords.latitude).toBeGreaterThanOrEqual(150);
    expect(coords.latitude).toBeLessThanOrEqual(250);
    expect(coords.longitude).toBeGreaterThanOrEqual(350);
    expect(coords.longitude).toBeLessThanOrEqual(450);
});