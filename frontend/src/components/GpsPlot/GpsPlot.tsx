import { useEffect, useRef } from "react";
import { useSensorContext } from "../../context/SensorContext"

export default function GpsPlot() {
    const canvasRef = useRef(null);
    const sensorData = useSensorContext();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        drawGrid(ctx, width, height, 20);
        drawAxes(ctx, width, height);
        drawLabels(ctx, width, height, 20);
    }, []);

    useEffect(() => {
        updateGPSMap(sensorData.gpsCoordinates);
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
        <canvas ref={canvasRef} width={400} height={400} />
    )
}