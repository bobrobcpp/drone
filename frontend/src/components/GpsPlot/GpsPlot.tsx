import { useEffect, useRef, useState } from "react";
import { useSensorContext } from "../../context/SensorContext"

export default function GpsPlot() {
    const [positions, setPositions] = useState([]);
    const [dimensions] = useState({ width: 800, height: 400 });
    const frontCanvasRef = useRef(null);
    const backCanvasRef = useRef(null);
    const sensorData = useSensorContext();

    // Set up the grid and axes on the background canvas on load
    useEffect(() => {
        const backCanvas = backCanvasRef.current;
        const backCtx = backCanvas.getContext("2d");
        drawGrid(backCtx);
    }, []);

    // Update the drone position on the front canvas when gpsCoordinates change
    useEffect(() => {
        setPositions((prev) => [...prev, sensorData.gpsCoordinates]);
        updateGPSMap(sensorData.gpsCoordinates,);
    }, [sensorData.gpsCoordinates]);

    const drawGrid = (ctx) => {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        ctx.strokeStyle = '#ccc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = "white";

        // Vertical lines
        for (let x = 0; x <= dimensions.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, dimensions.height);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.fillText(x.toString(), x, dimensions.height - 10);
        }

        // Horizontal lines
        for (let y = dimensions.height; y >= 0; y -= 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(dimensions.width, y);
            ctx.stroke();
            ctx.fillText(y.toString(), 15, dimensions.height - y);
        }
    };

    const updateGPSMap = ({ latitude, longitude }) => {
        const frontCanvas = frontCanvasRef.current;
        const ctx = frontCanvas.getContext("2d");
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw previous positions
        positions.forEach((position) => {
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(position.longitude, dimensions.height - position.latitude, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
        if (positions.length > 100) {
            setPositions(positions.slice(1));
        }
        // Draw drone
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(longitude, dimensions.height - latitude, 7, 0, Math.PI * 2);
        ctx.fill();
    };
    return (
        <div className="gps-plot">
            <canvas ref={backCanvasRef} width={800} height={400} />
            <canvas ref={frontCanvasRef} width={800} height={400} />
        </div>
    )
}