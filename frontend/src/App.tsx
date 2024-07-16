import { useCallback, useEffect, useRef, useState } from "react";

import Charts from "./components/Charts/Charts";

import "./App.css";

const MAX_DATA_POINTS = 100;

function App() {
	const canvasRef = useRef(null);

	const [altitude, setAltitude] = useState(0);
	const [altitudeUnit, setAltitudeUnit] = useState("meters");
	const [gpsCoordinates, setGpsCoordinates] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [batteryLevel, setBatteryLevel] = useState(0);
	const [speed, setSpeed] = useState(0);

	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const width = canvas.width;
		const height = canvas.height;
		drawGrid(ctx, width, height, 20);
		drawAxes(ctx, width, height);
		drawLabels(ctx, width, height, 20);
	}, []);

	// Function to draw the grid
	function drawGrid(ctx, width, height, step) {
		console.log("drawGrid", ctx, width, height, step);
		ctx.beginPath();
		ctx.strokeStyle = "gray";

		// Vertical lines
		for (let x = 0; x <= width; x += step) {
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
		}

		// Horizontal lines
		for (let y = 0; y <= height; y += step) {
			ctx.moveTo(0, y);
			ctx.lineTo(width, y);
		}

		ctx.stroke();
	}

	// Function to draw axes
	function drawAxes(ctx, width, height) {
		console.log("drawAxes", ctx, width, height);
		ctx.beginPath();
		ctx.strokeStyle = "white";
		ctx.lineWidth = 2;

		// X-axis
		ctx.moveTo(0, height / 2);
		ctx.lineTo(width, height / 2);

		// Y-axis
		ctx.moveTo(width / 2, 0);
		ctx.lineTo(width / 2, height);

		ctx.stroke();
	}

	function drawLabels(ctx, width, height, step) {
		ctx.fillStyle = "white";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";

		for (let x = 0; x <= width; x += step) {
			ctx.fillText(x - width / 2, x, height / 2 + 20);
		}

		for (let y = 0; y <= height; y += step) {
			ctx.fillText(-(y - height / 2), width / 2 - 20, y);
		}
	}

	useEffect(() => {
		updateGPSMap(gpsCoordinates);
	}, [gpsCoordinates]);

	useEffect(() => {
		const wsUrl = "ws://localhost:3000";
		const socket = new WebSocket(wsUrl);

		socket.onopen = (event) => {
			console.log("Connected to WebSocket server");
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			setAltitude(data.altitude);
			setAltitudeUnit(data.altitudeUnit || "meters");
			setGpsCoordinates(data.gpsCoordinates);
			setBatteryLevel(data.batteryLevel);
			setSpeed(data.speed);
			updateChartData(data);
		};

		socket.onerror = (error) => {
			console.error("WebSocket Error:", error);
		};

		socket.onclose = (event) => {
			console.log("Disconnected from WebSocket server");
		};

		return () => {
			socket.close();
		};
	}, []);

	const updateChartData = useCallback((newData) => {
		setChartData((prevData) => {
			const newChartData = [
				...prevData,
				{
					...newData,
					timestamp: new Date().toLocaleTimeString(),
				},
			];
			return newChartData.length > MAX_DATA_POINTS
				? newChartData.slice(-MAX_DATA_POINTS)
				: newChartData;
		});
	}, []);

	const updateGPSMap = ({ latitude, longitude }) => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.clearRect(longitude - 5, latitude - 5, 10, 10);
		// Draw drone
		ctx.fillStyle = "red";
		ctx.beginPath();
		ctx.arc(longitude, latitude, 2, 0, Math.PI * 2);
		ctx.fill();

		// Display coordinates
		ctx.fillStyle = "white";
		ctx.font = "14px Arial";
		ctx.fillText(
			`X: ${longitude.toFixed(2)}, Y: ${latitude.toFixed(2)}`,
			10,
			20,
		);
	};

	return (
		<div className="App">
			<div className="dashboard">
				<h1>Drone Telemetry Dashboard</h1>
				<div className="current-data">
					<h2>Current Data</h2>
					<div className="data-item">
						<span className="label">Altitude:</span>
						<span>
							{altitude} {altitudeUnit}
						</span>
					</div>
					<div className="data-item">
						<span className="label">GPS Coordinates:</span>
						<span>
							Lat: {gpsCoordinates.latitude}, Lon: {gpsCoordinates.longitude}
						</span>
					</div>
					<div className="data-item">
						<span className="label">Battery Level:</span>
						<span>{batteryLevel}%</span>
					</div>
					<div className="data-item">
						<span className="label">Speed:</span>
						<span>{speed} m/s</span>
					</div>
				</div>
				<canvas ref={canvasRef} width={400} height={400} />
				<Charts chartData={chartData} />
			</div>
		</div>
	);
}

export default App;
