import { useState, useCallback, useEffect } from 'react';
import { connectWebSocket } from '../services/websocketService';
import { processSensorData } from '../utils/sensorUtils';

import { SensorData } from '../types/SensorData';

export function useSensorData(): SensorData {
    const [altitude, setAltitude] = useState(0);
    const [altitudeUnit, setAltitudeUnit] = useState('meters');
    const [speed, setSpeed] = useState(0);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [gpsCoordinates, setGpsCoordinates] = useState({ latitude: 0, longitude: 0 });
    const [chartData, setChartData] = useState([]);

    const updateSensorData = useCallback((newData: SensorData) => {
        if ('altitude' in newData) setAltitude(newData.altitude);
        if ('altitudeUnit' in newData) setAltitudeUnit(newData.altitudeUnit);
        if ('speed' in newData) setSpeed(newData.speed);
        if ('batteryLevel' in newData) setBatteryLevel(newData.batteryLevel);
        if ('gpsCoordinates' in newData) setGpsCoordinates(newData.gpsCoordinates);

        setChartData(prevChartData => processSensorData(newData, prevChartData));
    }, []);

    useEffect(() => {
        const disconnect = connectWebSocket(updateSensorData);
        return () => disconnect();
    }, [updateSensorData]);

    return {
        altitude,
        altitudeUnit,
        speed,
        batteryLevel,
        gpsCoordinates,
        chartData
    };
}