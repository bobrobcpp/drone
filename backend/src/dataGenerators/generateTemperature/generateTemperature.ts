export function generateTemperature(simulatedTemperatureValue: number): number {
    // Simulate temperature increasing over time but reset to 20 when overheated
    const doRarely = Math.random() < 0.1;
    if (doRarely) {
        if (simulatedTemperatureValue > 60) {
            simulatedTemperatureValue = 20;
        } else {
            simulatedTemperatureValue += 1;
        }
    }
    return simulatedTemperatureValue;
}