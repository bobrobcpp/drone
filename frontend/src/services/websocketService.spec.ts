//@ts-nocheck
import { connectWebSocket } from './websocketService';
import { SensorData } from '../types/SensorData';

// Mock WebSocket
class MockWebSocket {
    onopen: (() => void) | null = null;
    onmessage: ((event: { data: string }) => void) | null = null;
    onerror: ((error: any) => void) | null = null;
    onclose: (() => void) | null = null;
    close = jest.fn();

    constructor(public url: string) { }
}

// Replace global WebSocket with our mock
(global as any).WebSocket = MockWebSocket;

describe('connectWebSocket', () => {
    let mockSocket: MockWebSocket;
    const mockOnDataReceived = jest.fn();

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
        mockOnDataReceived.mockClear();

        // Create a new mock WebSocket instance before each test
        mockSocket = new MockWebSocket('ws://localhost:4000/telemetry');
        (global as any).WebSocket = jest.fn(() => mockSocket);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should connect to the correct WebSocket URL', () => {
        connectWebSocket(mockOnDataReceived);
        expect(mockSocket.url).toBe('ws://localhost:4000/telemetry');
    });

    it('should log when connected to WebSocket server', () => {
        connectWebSocket(mockOnDataReceived);
        mockSocket.onopen();
        expect(console.log).toHaveBeenCalledWith('Connected to WebSocket server');
    });

    it('should call onDataReceived when a message is received', () => {
        const testData: SensorData = {
            altitude: 100,
            speed: 50,
            batteryLevel: 80,
            temperature: 25,
            gpsCoordinates: { latitude: 40, longitude: -74 },
            timestamp: 100000
        };

        connectWebSocket(mockOnDataReceived);
        mockSocket.onmessage({ data: JSON.stringify(testData) });

        expect(mockOnDataReceived).toHaveBeenCalledWith(testData);
    });

    it('should log error when WebSocket error occurs', () => {
        const testError = new Error('Test error');
        connectWebSocket(mockOnDataReceived);
        mockSocket.onerror(testError);

        expect(console.error).toHaveBeenCalledWith('WebSocket Error:', testError);
    });

    it('should log when disconnected from WebSocket server', () => {
        connectWebSocket(mockOnDataReceived);
        mockSocket.onclose();

        expect(console.log).toHaveBeenCalledWith('Disconnected from WebSocket server');
    });

    it('should return a function that closes the WebSocket', () => {
        const disconnect = connectWebSocket(mockOnDataReceived);
        disconnect();

        expect(mockSocket.close).toHaveBeenCalled();
    });
});