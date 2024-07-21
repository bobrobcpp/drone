//@ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Charts from './Charts';
import { useSensorContext } from "../../context/SensorContext";

jest.mock("../../context/SensorContext");

jest.mock('recharts', () => ({
    ResponsiveContainer: ({ children }) => <div data-testid="responsive-container">{children}</div>,
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    Legend: () => <div data-testid="legend" />,
    Line: () => <div data-testid="line" />,
}));

describe('Charts', () => {
    const mockSensorData = {
        altitude: 20,
        speed: 10,
        temperature: 25,
        chartData: [
            { timeString: '10:00', altitude: 30, speed: 10, temperature: 25 },
            { timeString: '10:01', altitude: 40, speed: 10, temperature: 26 },
        ],
        units: {
            altitude: 'm',
            speed: 'm/s',
            temperature: '°C',
        },
    };

    beforeEach(() => {
        (useSensorContext as jest.Mock).mockReturnValue(mockSensorData);
    });

    it('renders nothing when sensor data is empty', () => {
        (useSensorContext as jest.Mock).mockReturnValue({});
        const { container } = render(<Charts />);
        expect(container.firstChild).toBeNull();
    });

    it('renders charts for each sensor data type provided to test (altitude, speed, temperature)', () => {
        render(<Charts />);
        const charts = screen.getAllByTestId('responsive-container');
        expect(charts).toHaveLength(3);
    });

    it('renders correct chart components', () => {
        render(<Charts />);
        expect(screen.getAllByTestId('line-chart')).toHaveLength(3);
        expect(screen.getAllByTestId('cartesian-grid')).toHaveLength(3);
        expect(screen.getAllByTestId('x-axis')).toHaveLength(3);
        expect(screen.getAllByTestId('y-axis')).toHaveLength(6);
        expect(screen.getAllByTestId('tooltip')).toHaveLength(3);
        expect(screen.getAllByTestId('legend')).toHaveLength(3);
        expect(screen.getAllByTestId('line')).toHaveLength(3);
    });
});