export interface SensorReading {
    sensorId: string;
    timestamp: bigint;
    value: number | { latitude: number, longitude: number };
    unit: string;
}

export type SensorType = 'Gps' | 'Altimeter' | 'Speed' | 'Battery';