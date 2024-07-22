export function generateGpsCoordinates() {
    const baseEasting = 400;
    const baseNorthing = 200;
    const variation = 50;
    return {
        easting: +(baseEasting + Math.random() * variation * 2 - variation).toFixed(6),
        northing: +(baseNorthing + Math.random() * variation * 2 - variation).toFixed(6)
    };
}