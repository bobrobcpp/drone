import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { useSensorContext } from "../../context/SensorContext";

export default function Charts() {
    const sensorData = useSensorContext();
    const chartColors = ["#ffc658", "#82ca9d", "#8884d8"];
    console.log(sensorData, 'sensorData')
    if (!Object.keys(sensorData).length) {
        return null;
    }
    const { timestamp, gpsCoordinates, chartData, altitudeUnit, ...rest } = sensorData;
    return (
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
    );
}
