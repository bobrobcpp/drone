import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import GaugeChart from 'react-gauge-chart'

import { useSensorContext } from "../../context/SensorContext";

export default function Charts() {
    const sensorData = useSensorContext();
    const chartColors = ["#ffc658", "#82ca9d", "#8884d8"];
    if (!Object.keys(sensorData).length) {
        return null;
    }
    const { timestamp, gpsCoordinates, chartData, altitudeUnit, ...rest } = sensorData;
    return (
        <div>
            <GaugeChart id="gauge-chart1" percent={sensorData.batteryLevel / 100} animate={false} nrOfLevels={30} colors={["#DB0032", "#ff6d2b", "#66ec0a"]} style={{ height: 250, width: 250 }} />
            <div className="charts">
                {Object.keys(rest).map((key, index) => (
                    <LineChart width={600} height={300} data={sensorData.chartData} key={index}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey={key}
                            stroke={chartColors[index]}
                        />
                    </LineChart>
                ))}
            </div>
        </div>
    );
}
