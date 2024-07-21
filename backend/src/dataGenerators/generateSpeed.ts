export function generateSpeed() {
    const baseSpeed = 15;
    const variation = 2;
    return +(baseSpeed + Math.random() * variation * 2 - variation).toFixed(2);
}