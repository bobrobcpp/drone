//@ts-nocheck
import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GpsPlot from './GpsPlot';
import { useSensorContext } from "../../context/SensorContext";

jest.mock("../../context/SensorContext");

// Mock canvas methods
const mockGetContext = jest.fn();
HTMLCanvasElement.prototype.getContext = mockGetContext;

describe('GpsPlot', () => {
    const mockSensorData = {
        gpsCoordinates: { easting: 200, northing: 100 },
    };

    beforeEach(() => {
        (useSensorContext as jest.Mock).mockReturnValue(mockSensorData);
        mockGetContext.mockReturnValue({
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            moveTo: jest.fn(),
            lineTo: jest.fn(),
            stroke: jest.fn(),
            fillText: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
        });
        jest.clearAllMocks();
    });

    it('renders', () => {
        render(<GpsPlot />);
    });

    it('creates two canvases', () => {
        const { container } = render(<GpsPlot />);
        const canvases = container.querySelectorAll('canvas');
        expect(canvases).toHaveLength(2);
    });

    it('updates dimensions on window resize', () => {
        jest.spyOn(window, 'addEventListener');
        render(<GpsPlot />);
        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });

    it('draws grid on mount and updates on dimension change', () => {
        const { rerender } = render(<GpsPlot />);

        // Check initial render
        expect(mockGetContext).toHaveBeenCalled();
        expect(mockGetContext().clearRect).toHaveBeenCalled();
        expect(mockGetContext().beginPath).toHaveBeenCalled();
        expect(mockGetContext().moveTo).toHaveBeenCalled();
        expect(mockGetContext().lineTo).toHaveBeenCalled();
        expect(mockGetContext().stroke).toHaveBeenCalled();
        expect(mockGetContext().fillText).toHaveBeenCalled();

        // Clear mocks for next check
        jest.clearAllMocks();

        // Simulate dimension change
        act(() => {
            global.innerWidth = 1000;
            global.dispatchEvent(new Event('resize'));
        });

        rerender(<GpsPlot />);

        // Check after dimension change
        expect(mockGetContext).toHaveBeenCalled();
        expect(mockGetContext().clearRect).toHaveBeenCalled();
        expect(mockGetContext().beginPath).toHaveBeenCalled();
        expect(mockGetContext().moveTo).toHaveBeenCalled();
        expect(mockGetContext().lineTo).toHaveBeenCalled();
        expect(mockGetContext().stroke).toHaveBeenCalled();
        expect(mockGetContext().fillText).toHaveBeenCalled();
    });

    it('updates GPS map when coordinates change', () => {
        render(<GpsPlot />);
        expect(mockGetContext().arc).toHaveBeenCalled();
        expect(mockGetContext().fill).toHaveBeenCalled();

        // Clear mocks for next check
        jest.clearAllMocks();

        // Simulate GPS coordinate change
        const newMockSensorData = {
            gpsCoordinates: { easting: 250, northing: 150 },
        };
        (useSensorContext as jest.Mock).mockReturnValue(newMockSensorData);

        render(<GpsPlot />);
        expect(mockGetContext().arc).toHaveBeenCalled();
        expect(mockGetContext().fill).toHaveBeenCalled();
    });
});