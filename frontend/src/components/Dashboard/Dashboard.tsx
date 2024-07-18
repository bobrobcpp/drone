import DeviceStatus from '../DeviceStatus/DeviceStatus';
import SensorDisplay from '../SensorDisplay/SensorDisplay';
import Charts from '../Charts/Charts';
import GpsPlot from '../GpsPlot/GpsPlot';

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="key-info">
                <SensorDisplay />
                <GpsPlot />
                <DeviceStatus />
            </div>
            <Charts />
        </div>
    );
}
