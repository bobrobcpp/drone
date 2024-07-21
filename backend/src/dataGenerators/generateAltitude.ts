export function generateAltitude() {
    const baseAltitude = 20;
    const variation = 4;
    return +(baseAltitude + Math.random() * variation * 2 - variation).toFixed(2);
}