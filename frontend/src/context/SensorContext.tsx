import { createContext, useContext } from 'react';
import { useSensorData } from '../hooks/useSensorData';

const SensorContext = createContext({});

export function SensorProvider({ children }) {
    const sensorData = useSensorData();

    return (
        <SensorContext.Provider value={sensorData}>
            {children}
        </SensorContext.Provider>
    );
}

export function useSensorContext() {
    return useContext(SensorContext);
}