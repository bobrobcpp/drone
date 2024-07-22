import { useSensorContext } from "../../context/SensorContext"

export default function SensorDisplay() {
    const sensorData = useSensorContext();
    return (
        <div className="current-data">
            <div className="data-item">
                <span className="label">Altitude:</span>
                <span>
                    {sensorData.altitude} {sensorData.units.altitude}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Easting:</span>
                <span>
                    {sensorData.gpsCoordinates.easting}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Northing:</span>
                <span>
                    {sensorData.gpsCoordinates.northing}
                </span>
            </div>
            <div className="data-item">
                <span className="label">Battery Level:</span>
                <span>{sensorData.batteryLevel}{sensorData.units.batteryLevel}</span>
            </div>
            <div className="data-item">
                <span className="label">Temperature:</span>
                <span>{sensorData.temperature}{sensorData.units.temperature}</span>
            </div>
            <div className="data-item">
                <span className="label">Speed:</span>
                <span>{sensorData.speed} {sensorData.units.speed}</span>
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
