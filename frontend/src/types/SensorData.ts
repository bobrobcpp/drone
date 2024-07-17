export interface SensorData {
    altitude: number;
    altitudeUnit: string;
    speed: number;
    batteryLevel: number;
    gpsCoordinates: {
        latitude: number;
        longitude: number;
    };
    chartData: any[];
}