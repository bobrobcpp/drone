export function generateBatteryValue(simulatedBatteryValue) {
    // Simulate battery level decreasing over time but reset to 100% when drained
    const doRarely = Math.random() < 0.1;
    if (doRarely) {
        if (simulatedBatteryValue <= 0) {
            simulatedBatteryValue = 100;
        } else {
            simulatedBatteryValue -= 1;
        }
    }
    return simulatedBatteryValue;
}