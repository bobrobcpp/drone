import { useSensorContext } from "../../context/SensorContext"

export default function SensorDisplay() {
    const sensorData = useSensorContext();
    return (
        <div className="current-data">
            <div className="data-item">
                <span className="label">Altitude:</span>
                <span>
                    {sensorData.altitude} {sensorData.altitudeUnit}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Lat:</span>
                <span>
                    {sensorData.gpsCoordinates.latitude}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Lon:</span>
                <span>
                    {sensorData.gpsCoordinates.longitude}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Battery Level:</span>
                <span>{sensorData.batteryLevel}%</span>
            </div>
            <div className="data-item">
                <span className="label">Temperature:</span>
                <span>{sensorData.temperature}°C</span>
            </div>
            <div className="data-item">
                <span className="label">Speed:</span>
                <span>{sensorData.speed} m/s</span>
            </div>
            <div className="data-item">
                <span className="label">System Time:</span>
                <span>{new Date(sensorData.timestamp)?.toLocaleTimeString()}</span>
            </div>
            <div className="data-item">
                <span className="label">System Time Delay:</span>
                <span>{sensorData.timeDiff}</span>
            </div>

        </div>
    )
}
