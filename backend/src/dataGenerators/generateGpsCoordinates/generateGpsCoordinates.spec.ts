//@ts-nocheck
import { generateGpsCoordinates } from "./generateGpsCoordinates";

test('generateGpsCoordinates returns object with easting and northing', () => {
    const coords = generateGpsCoordinates();
    expect(coords).toHaveProperty('easting');
    expect(coords).toHaveProperty('northing');
    expect(coords.northing).toBeGreaterThanOrEqual(150);
    expect(coords.northing).toBeLessThanOrEqual(250);
    expect(coords.easting).toBeGreaterThanOrEqual(350);
    expect(coords.easting).toBeLessThanOrEqual(450);
});