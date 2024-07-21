import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";

import { useSensorContext } from "../../context/SensorContext";

export default function Charts() {
    const sensorData = useSensorContext();
    const chartColors = ["#ffc658", "#82ca9d", "#8884d8"];
    if (!Object.keys(sensorData).length) {
        return null;
    }
    // Remove unnecessary keys to display only chart data
    const { timestamp, timeDiff, gpsCoordinates, chartData, units, ...rest } = sensorData;
    return (
        <div className="charts">
            {Object.keys(rest).map((key, index) => (
                <ResponsiveContainer width="95%" height={300} key={index}>
                    <LineChart width={600} height={300} data={sensorData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timeString" />
                        <YAxis yAxisId="left" domain={[0, 40]} unit={units[key]} />
                        <YAxis yAxisId="right" orientation="right" dataKey={key} domain={[0, 40]} />
                        <Tooltip />
                        <Legend />
                        <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey={key}
                            stroke={chartColors[index]}
                            name={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ))}
        </div>
    );
}
