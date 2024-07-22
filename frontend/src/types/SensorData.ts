export interface SensorData {
    altitude: number;
    units: { [k: string]: string };
    speed: number;
    batteryLevel: number;
    temperature: number;
    gpsCoordinates: {
        easting: number;
        northing: number;
    };
    timestamp: number;
    timeDiff: number;
    chartData: ChartableData[];
}

export interface ChartableData extends SensorData {
    timeString: string;
}