import { useState, useCallback, useEffect } from 'react';
import { connectWebSocket } from '../services/websocketService';
import { processSensorDataForCharting } from '../utils/sensorUtils';

import { SensorData, ChartableData } from '../types/SensorData';

export function useSensorData(): SensorData {
    const [altitude, setAltitude] = useState(0);
    // Would change BE response to {value, unit} but would take extra processing step to chart data so keeping in FE
    const [units] = useState({ altitude: 'm', speed: 'km/h', temperature: '°C', batteryLevel: '%', timeDiff: 's', timestamp: 'ms' });
    const [speed, setSpeed] = useState(0);
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [gpsCoordinates, setGpsCoordinates] = useState({ easting: 0, northing: 0 });
    const [timestamp, setTimestamp] = useState(0);
    const [timeDiff, setTimeDiff] = useState(0);
    const [chartData, setChartData] = useState([] as ChartableData[]);

    const updateSensorData = useCallback((newData: SensorData) => {
        if ('altitude' in newData) setAltitude(newData.altitude);
        if ('speed' in newData) setSpeed(newData.speed);
        if ('batteryLevel' in newData) setBatteryLevel(newData.batteryLevel);
        if ('temperature' in newData) setTemperature(newData.temperature);
        if ('gpsCoordinates' in newData) setGpsCoordinates(newData.gpsCoordinates);
        if ('timestamp' in newData) {
            setTimestamp(newData.timestamp);
            setTimeDiff((newData.timestamp - Date.now()) / 1000);
        }
        // Limit the number of data points to display on the chart to 1000
        const maxDataPoints = 1000;
        setChartData(prevChartData => processSensorDataForCharting(newData, prevChartData, maxDataPoints));
    }, []);

    useEffect(() => {
        const disconnect = connectWebSocket(updateSensorData);
        return () => disconnect();
    }, [updateSensorData]);

    return {
        altitude,
        units,
        speed,
        batteryLevel,
        temperature,
        gpsCoordinates,
        timestamp,
        timeDiff,
        chartData
    };
}