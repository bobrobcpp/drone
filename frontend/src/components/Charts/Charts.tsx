import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Charts({chartData}) {
    const chartColors = ['#ffc658', '#82ca9d', '#8884d8'];
    if (!chartData.length) {
        return null;
    }

    const {timestamp, gpsCoordinates, ...rest} = chartData[0];

    return (
        <div className="charts">
            {Object.keys(rest).map((key, index) => (
                <LineChart width={600} height={300} data={chartData} key={index}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey={key} stroke={chartColors[index]} />
                </LineChart>
            ))}
        </div>
    );
}