import { useEffect, useRef, useState } from "react";
import { useSensorContext } from "../../context/SensorContext"

export default function GpsPlot() {
    const [positions, setPositions] = useState([]);
    const [dimensions] = useState({ width: 400, height: 400 });
    const frontCanvasRef = useRef(null);
    const backCanvasRef = useRef(null);
    const sensorData = useSensorContext();

    // Set up the grid and axes on the background canvas on load
    useEffect(() => {
        const backCanvas = backCanvasRef.current;
        const backCtx = backCanvas.getContext("2d");
        const width = dimensions.width;
        const height = dimensions.height;
        drawGrid(backCtx, width, height, 20);
        drawAxes(backCtx, width, height);
        drawLabels(backCtx, width, height, 20);
    }, []);

    // Update the drone position on the front canvas when gpsCoordinates change
    useEffect(() => {
        setPositions((prev) => [...prev, sensorData.gpsCoordinates]);
        updateGPSMap(sensorData.gpsCoordinates,);
    }, [sensorData.gpsCoordinates]);

    // Function to draw the grid
    function drawGrid(ctx, width, height, step) {
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

    const updateGPSMap = ({ latitude, longitude }) => {
        const frontCanvas = frontCanvasRef.current;
        const ctx = frontCanvas.getContext("2d");
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw previous positions
        positions.forEach((position) => {
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(position.longitude, position.latitude, 3, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw drone
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(longitude, latitude, 5, 0, Math.PI * 2);
        ctx.fill();
    };
    return (
        <div className="gps-plot">
            <canvas ref={backCanvasRef} width={400} height={400} />
            <canvas ref={frontCanvasRef} width={400} height={400} />
        </div>
    )
}