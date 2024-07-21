import { SensorData, ChartableData } from '../types/SensorData';

export function processSensorDataForCharting(newData: SensorData, prevChartData: ChartableData[], maxDataPoints: number): ChartableData[] {
    const timeString = new Date(newData.timestamp).toLocaleTimeString();
    const newDataPoint = { ...newData, timeString };
    const updatedChartData = [...prevChartData, newDataPoint];
    // Only the most recent data points are displayed once maxDataPoints is reached
    return updatedChartData.slice(-maxDataPoints);
}