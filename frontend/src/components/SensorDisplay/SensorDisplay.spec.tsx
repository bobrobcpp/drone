//@ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SensorDisplay from './SensorDisplay';
import { useSensorContext } from "../../context/SensorContext";

jest.mock("../../context/SensorContext");

describe('SensorDisplay', () => {
    const mockSensorData = {
        altitude: 1000,
        gpsCoordinates: { latitude: 100.01, longitude: 200.2 },
        batteryLevel: 80,
        temperature: 25,
        speed: 50,
        timestamp: 100000000,
        timeDiff: 0.5,
        units: {
            altitude: 'm',
            batteryLevel: '%',
            temperature: '°C',
            speed: 'km/h'
        }
    };

    beforeEach(() => {
        (useSensorContext as jest.Mock).mockReturnValue(mockSensorData);
    });

    it('renders all sensor data correctly', () => {
        render(<SensorDisplay />);

        expect(screen.getByText('Altitude:')).toBeInTheDocument();
        expect(screen.getByText('1000 m')).toBeInTheDocument();

        expect(screen.getByText('Lat:')).toBeInTheDocument();
        expect(screen.getByText('100.01')).toBeInTheDocument();

        expect(screen.getByText('Lon:')).toBeInTheDocument();
        expect(screen.getByText('200.2')).toBeInTheDocument();

        expect(screen.getByText('Battery Level:')).toBeInTheDocument();
        expect(screen.getByText('80%')).toBeInTheDocument();

        expect(screen.getByText('Temperature:')).toBeInTheDocument();
        expect(screen.getByText('25°C')).toBeInTheDocument();

        expect(screen.getByText('Speed:')).toBeInTheDocument();
        expect(screen.getByText('50 km/h')).toBeInTheDocument();

        expect(screen.getByText('System Time:')).toBeInTheDocument();
        expect(screen.getByText('System Time:')).toBeInTheDocument();

        expect(screen.getByText('System Time Delay:')).toBeInTheDocument();
        expect(screen.getByText('0.5')).toBeInTheDocument();
    });

    it('handles missing data gracefully', () => {
        const incompleteData = {
            ...mockSensorData,
            altitude: undefined,
            gpsCoordinates: { latitude: undefined, longitude: undefined },
        };
        (useSensorContext as jest.Mock).mockReturnValue(incompleteData);

        render(<SensorDisplay />);

        expect(screen.getByText('Altitude:')).toBeInTheDocument();
        expect(screen.getByText('m')).toBeInTheDocument();

        expect(screen.getByText('Lat:')).toBeInTheDocument();
        expect(screen.getByText('Lon:')).toBeInTheDocument();
    });
});