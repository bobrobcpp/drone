import { createContext, useContext } from 'react';
import { useSensorData } from '../hooks/useSensorData';

import { SensorData } from '../types/SensorData';

const SensorContext = createContext({} as SensorData);

export function SensorProvider({ children }: { children: React.ReactNode }) {
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