//@ts-nocheck
import { WebSocket, WebSocketServer } from 'ws';
import { initializeStream } from './server';
import TG from '../dataGenerators/TelemetryGenerator/TelemetryGenerator';

jest.mock('ws');
jest.mock('../dataGenerators/TelemetryGenerator/TelemetryGenerator');

describe('WebSocket Server', () => {
    let mockWs;
    let mockDataStream;
    let connectionHandler;

    beforeEach(() => {
        mockWs = {
            readyState: WebSocket.OPEN,
            send: jest.fn(),
            on: jest.fn(),
            dataStream: undefined,
        };

        mockDataStream = {
            on: jest.fn().mockReturnThis(),
            removeAllListeners: jest.fn(),
            destroy: jest.fn()
        };
        TG.mockImplementation(() => mockDataStream);

        jest.spyOn(console, 'log').mockImplementation(() => { });
        jest.spyOn(console, 'error').mockImplementation(() => { });
        const mockWss = new WebSocketServer();

        mockWss.on = jest.fn((event, handler) => {
            if (event === 'connection') {
                connectionHandler = handler;
            }
        });

        // Simulate the creation of the WebSocketServer
        WebSocketServer.mockImplementation(() => mockWss);

        // Run the server code to set up the connection handler
        import('./server');
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
        jest.useRealTimers();
    });

    test('error event restarts the stream', () => {
        jest.useFakeTimers();
        const initialCallCount = TG.mock.calls.length;
        const dataStream = initializeStream(mockWs);
        const errorCallback = mockDataStream.on.mock.calls.find(call => call[0] === 'error')[1];
        errorCallback(new Error('Test error'));

        expect(mockDataStream.removeAllListeners).toHaveBeenCalled();
        expect(mockDataStream.destroy).toHaveBeenCalled();

        jest.runAllTimers();

        const finalCallCount = TG.mock.calls.length;
        expect(finalCallCount).toBe(initialCallCount + 2);
        jest.useRealTimers();
    });

    test('end event restarts the stream', () => {
        jest.useFakeTimers();
        const initialCallCount = TG.mock.calls.length;
        const dataStream = initializeStream(mockWs);
        const endCallback = mockDataStream.on.mock.calls.find(call => call[0] === 'end')[1];
        endCallback();

        expect(mockDataStream.removeAllListeners).toHaveBeenCalled();
        expect(mockDataStream.destroy).toHaveBeenCalled();

        jest.runAllTimers();

        const finalCallCount = TG.mock.calls.length;
        expect(finalCallCount).toBe(initialCallCount + 2);
        jest.useRealTimers();
    });
});

