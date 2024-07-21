export function generateGpsCoordinates() {
    const baseLat = 200;
    const baseLon = 400;
    const variation = 50;
    return {
        latitude: +(baseLat + Math.random() * variation * 2 - variation).toFixed(6),
        longitude: +(baseLon + Math.random() * variation * 2 - variation).toFixed(6)
    };
}