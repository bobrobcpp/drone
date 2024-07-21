//@ts-nocheck
import React from 'react';
import { render, getByText, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from './Dashboard';
jest.mock('../SensorDisplay/SensorDisplay', () => () => <div>SensorDisplay</div>);
jest.mock('../Charts/Charts', () => () => <div>Charts</div>);
jest.mock('../DeviceStatus/DeviceStatus', () => () => <div>DeviceStatus</div>);
jest.mock('../GpsPlot/GpsPlot', () => () => <div>GpsPlot</div>);
describe('Dashboard', () => {

    it('renders children', () => {
        const { container } = render(<Dashboard />);
        expect(screen.getByText('SensorDisplay')).toBeInTheDocument();
        expect(screen.getByText('Charts')).toBeInTheDocument();
        expect(screen.getByText('DeviceStatus')).toBeInTheDocument();
        expect(screen.getByText('GpsPlot')).toBeInTheDocument();
    });
});