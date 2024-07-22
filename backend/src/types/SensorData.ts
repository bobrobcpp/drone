export interface SensorData {
    altitude: number;
    speed: number;
    batteryLevel: number;
    temperature: number;
    gpsCoordinates: {
        easting: number;
        northing: number;
    };
    timestamp: number;
}

export interface ChartableData extends SensorData {
    timeString: string;
}