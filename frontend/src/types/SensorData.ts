export interface SensorData {
    altitude: number;
    altitudeUnit: string;
    speed: number;
    batteryLevel: number;
    temperature: number;
    gpsCoordinates: {
        latitude: number;
        longitude: number;
    };
    timestamp: number;
    timeDiff: number;
    chartData: ChartableData[];
}

export interface ChartableData extends SensorData {
    timeString: string;
}