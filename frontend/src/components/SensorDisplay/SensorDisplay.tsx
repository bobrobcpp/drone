import { useSensorContext } from "../../context/SensorContext"

export default function SensorDisplay() {
    const sensorData = useSensorContext();
    return (
        <div className="current-data">
            <h2>Current Data</h2>
            <div className="data-item">
                <span className="label">Altitude:</span>
                <span>
                    {sensorData.altitude} {sensorData.altitudeUnit}
                </span>
            </div>
            <div className="data-item">
                <span className="label">GPS Coordinates:</span>
                <span>
                    Lat: {sensorData.gpsCoordinates.latitude}, Lon: {sensorData.gpsCoordinates.longitude}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Battery Level:</span>
                <span>{sensorData.batteryLevel}%</span>
            </div>
            <div className="data-item">
                <span className="label">Speed:</span>
                <span>{sensorData.speed} m/s</span>
            </div>
        </div>
    )
}
