const MAX_DATA_POINTS = 100;

export function processSensorData(newData, prevChartData) {
    const timestamp = new Date().toLocaleTimeString();
    const newDataPoint = { ...newData, timestamp };
    const updatedChartData = [...prevChartData, newDataPoint];
    return updatedChartData.slice(-MAX_DATA_POINTS);
}