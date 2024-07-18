import GaugeChart from 'react-gauge-chart'

import { useSensorContext } from "../../context/SensorContext";

export default function Charts() {
    const sensorData = useSensorContext();
    const { batteryLevel, speed } = sensorData;
    return (
        <div className='gauge-container'>
            <div className='data-item'>
                <h2>Battery</h2>
                <GaugeChart id="gauge-chart1" percent={batteryLevel / 100} animate={false} nrOfLevels={30} colors={["#DB0032", "#ff6d2b", "#66ec0a"]} style={{ height: 100, width: 200 }} />
            </div>
            <div className='data-item'>
                <h2>Speed</h2>
                <GaugeChart id="gauge-chart1" formatTextValue={(speed) => `${speed} m/s`} percent={speed / 100} animate={false} nrOfLevels={30} colors={["#66ec0a", "#ff6d2b", "#DB0032"]} style={{ height: 100, width: 200 }} />
            </div>
        </div>
    );
}
