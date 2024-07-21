//@ts-nocheck
import { renderHook, act } from '@testing-library/react';
import { useSensorData } from './useSensorData';
import { connectWebSocket } from '../services/websocketService';
import { processSensorDataForCharting } from '../utils/sensorUtils';

jest.mock('../services/websocketService');
jest.mock('../utils/sensorUtils');

describe('useSensorData', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (connectWebSocket as jest.Mock).mockImplementation((callback) => {
            // Simulate WebSocket connection by immediately calling the callback
            callback({
                altitude: 100,
                speed: 50,
                batteryLevel: 80,
                temperature: 25,
                gpsCoordinates: { latitude: 100, longitude: 200 },
                timestamp: 1000000
            });
            return jest.fn();
        });
        (processSensorDataForCharting as jest.Mock).mockReturnValue([{ time: 1720000000001, altitude: 100 }]);
    });

    it('should update sensor data when WebSocket receives data', () => {
        const { result } = renderHook(() => useSensorData());

        expect(result.current).toEqual(expect.objectContaining({
            altitude: 100,
            speed: 50,
            batteryLevel: 80,
            temperature: 25,
            gpsCoordinates: { latitude: 100, longitude: 200 },
        }));
        expect(result.current.timestamp).toBeGreaterThan(0);
        expect(result.current.timeDiff).not.toBe(0);
        expect(result.current.chartData).toEqual([{ time: expect.any(Number), altitude: 100 }]);
    });

    it('should call connectWebSocket on mount', () => {
        renderHook(() => useSensorData());
        expect(connectWebSocket).toHaveBeenCalledTimes(1);
    });

    it('should call disconnect on unmount', () => {
        const disconnect = jest.fn();
        (connectWebSocket as jest.Mock).mockReturnValue(disconnect);

        const { unmount } = renderHook(() => useSensorData());
        unmount();

        expect(disconnect).toHaveBeenCalledTimes(1);
    });

    it('should not update state for undefined properties', () => {
        (connectWebSocket as jest.Mock).mockImplementation((callback) => {
            callback({
                altitude: 200,
            });
            return jest.fn();
        });

        const { result } = renderHook(() => useSensorData());

        expect(result.current.altitude).toBe(200);
        expect(result.current.speed).toBe(0); // Should remain unchanged
    });

    it('should calculate timeDiff correctly', () => {
        const now = Date.now();
        jest.spyOn(Date, 'now').mockReturnValue(now);

        (connectWebSocket as jest.Mock).mockImplementation((callback) => {
            callback({
                timestamp: now + 5000, // 5 seconds in the future
            });
            return jest.fn();
        });

        const { result } = renderHook(() => useSensorData());

        expect(result.current.timeDiff).toBe(5);
    });
});