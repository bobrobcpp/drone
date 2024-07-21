//@ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DeviceStatus from './DeviceStatus';
import { useSensorContext } from "../../context/SensorContext";

jest.mock("../../context/SensorContext");

describe('DeviceStatus', () => {
    const mockSensorData = {
        batteryLevel: 75,
        speed: 50,
    };

    beforeEach(() => {
        (useSensorContext as jest.Mock).mockReturnValue(mockSensorData);
    });

    it('renders without crashing', () => {
        render(<DeviceStatus />);
    });

    it('renders Battery label', () => {
        render(<DeviceStatus />);
        expect(screen.getByText('Battery')).toBeInTheDocument();
    });

    it('renders Speed label', () => {
        render(<DeviceStatus />);
        expect(screen.getByText('Speed')).toBeInTheDocument();
    });
});