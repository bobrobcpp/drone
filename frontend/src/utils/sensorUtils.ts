import { SensorData, ChartableData } from '../types/SensorData';

const MAX_DATA_POINTS = 1000;

export function processSensorDataForCharting(newData: SensorData, prevChartData: ChartableData[]): ChartableData[] {
    const timeString = new Date(newData.timestamp).toLocaleTimeString();
    const newDataPoint = { ...newData, timeString };
    const updatedChartData = [...prevChartData, newDataPoint];
    // Only the most recent 1000 data points are displayed
    return updatedChartData.slice(-MAX_DATA_POINTS);
}