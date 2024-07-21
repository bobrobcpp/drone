//@ts-nocheck
import { processSensorDataForCharting } from './sensorUtils';
import { SensorData, ChartableData } from '../types/SensorData';

describe('processSensorDataForCharting', () => {
    const testTimestamp = 999;
    const maxDataPoints = 10;
    beforeEach(() => {
        jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('12:00:00');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should add new data point to the chart data', () => {
        const newData: SensorData = {
            altitude: 100,
            speed: 50,
            batteryLevel: 80,
            temperature: 25,
            gpsCoordinates: { latitude: 100, longitude: 200 },
            timestamp: testTimestamp
        };
        const prevChartData: ChartableData[] = [];

        const result = processSensorDataForCharting(newData, prevChartData, maxDataPoints);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            ...newData,
            timeString: '12:00:00'
        });
    });

    it('should maintain the order of data points', () => {
        const newData: SensorData = {
            altitude: 200,
            speed: 60,
            batteryLevel: 70,
            temperature: 30,
            gpsCoordinates: { latitude: 100, longitude: 200 },
            timestamp: testTimestamp
        };
        const prevChartData: ChartableData[] = [{
            altitude: 100,
            speed: 50,
            batteryLevel: 80,
            temperature: 25,
            gpsCoordinates: { latitude: 100, longitude: 200 },
            timestamp: testTimestamp,
            timeString: '11:59:00'
        }];

        const result = processSensorDataForCharting(newData, prevChartData, maxDataPoints);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual(prevChartData[0]);
        expect(result[1]).toEqual({
            ...newData,
            timeString: '12:00:00'
        });
    });

    it('should limit the number of data points to maxDataPoints', () => {
        const prevChartData: ChartableData[] = Array(10).fill(null).map((_, index) => ({
            altitude: index,
            speed: index,
            batteryLevel: index,
            temperature: index,
            gpsCoordinates: { latitude: index, longitude: index },
            timestamp: testTimestamp,
            timeString: `12:00:${index.toString().padStart(2, '0')}`
        }));
        const newData: SensorData = {
            altitude: 1001,
            speed: 1001,
            batteryLevel: 1001,
            temperature: 1001,
            gpsCoordinates: { latitude: 100, longitude: 200 },
            timestamp: testTimestamp
        };

        const result = processSensorDataForCharting(newData, prevChartData, maxDataPoints);

        expect(result).toHaveLength(10);
        expect(result[0].altitude).toBe(1); // The oldest data point should be removed
        expect(result[9]).toEqual({
            ...newData,
            timeString: '12:00:00'
        });
    });

    it('should handle empty previous chart data', () => {
        const newData: SensorData = {
            altitude: 100,
            speed: 50,
            batteryLevel: 80,
            temperature: 25,
            gpsCoordinates: { latitude: 100, longitude: 200 },
            timestamp: testTimestamp
        };

        const result = processSensorDataForCharting(newData, []);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            ...newData,
            timeString: '12:00:00'
        });
    });
});