import SensorDisplay from '../SensorDisplay/SensorDisplay';
import Charts from '../Charts/Charts';
import GpsPlot from '../GpsPlot/GpsPlot';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Drone Telemetry Dashboard</h1>
            <SensorDisplay />
            <GpsPlot />
            <Charts />
        </div>
    );
}
