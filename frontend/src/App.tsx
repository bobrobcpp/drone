// @ts-nocheck
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';

const MAX_DATA_POINTS = 20;

function App() {
  const [currentData, setCurrentData] = useState({
    altitude: 0,
    altitudeUnit: 'meters',
    gpsCoordinates: { latitude: 0, longitude: 0 },
    batteryLevel: 0,
    speed: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const wsUrl = 'ws://localhost:3000';
    const socket = new WebSocket(wsUrl);

    socket.onopen = (event) => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setCurrentData(data);
      updateChartData(data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    socket.onclose = (event) => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      socket.close();
    };
  }, []);

  const updateChartData = (newData) => {
    setChartData(prevData => {
      const newChartData = [...prevData, { ...newData, timestamp: new Date().toLocaleTimeString() }];
      if (newChartData.length > MAX_DATA_POINTS) {
        return newChartData.slice(-MAX_DATA_POINTS);
      }
      return newChartData;
    });
  };

  return (
    <div className="App">
      <div className="dashboard">
        <h1>Drone Telemetry Dashboard</h1>
        <div className="current-data">
          <h2>Current Data</h2>
          <div className="data-item">
            <span className="label">Altitude:</span>
            <span>{currentData.altitude} {currentData.altitudeUnit}</span>
          </div>
          <div className="data-item">
            <span className="label">GPS Coordinates:</span>
            <span>Lat: {currentData.gpsCoordinates.latitude}, Lon: {currentData.gpsCoordinates.longitude}</span>
          </div>
          <div className="data-item">
            <span className="label">Battery Level:</span>
            <span>{currentData.batteryLevel}%</span>
          </div>
          <div className="data-item">
            <span className="label">Speed:</span>
            <span>{currentData.speed} m/s</span>
          </div>
        </div>
        <div className="charts">
          <h2>Data Over Time</h2>
          <LineChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="altitude" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="batteryLevel" stroke="#82ca9d" />
            <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#ffc658" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default App;