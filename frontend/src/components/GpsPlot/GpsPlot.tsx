import { useEffect, useRef, useState } from "react";
import { useSensorContext } from "../../context/SensorContext"
import { SensorData } from "../../types/SensorData";

export default function GpsPlot() {
    const [positions, setPositions] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    const sensorData = useSensorContext();

    // Update dimensions based on viewport width
    useEffect(() => {
        const updateDimensions = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const newWidth = Math.min(vw - 40, 800);
            setDimensions({ width: newWidth, height: newWidth / 2 });
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Set up the grid and axes on the background canvas when dimensions change and onload
    useEffect(() => {
        const backCanvas = backCanvasRef.current;
        const backCtx = backCanvas!.getContext("2d");
        backCtx && drawGrid(backCtx);
    }, [dimensions]);

    // Update the drone position on the front canvas when gpsCoordinates change
    useEffect(() => {
        // @ts-ignore
        setPositions((prev) => [...prev, sensorData.gpsCoordinates]);
        updateGPSMap(sensorData.gpsCoordinates);
    }, [sensorData.gpsCoordinates]);

    const drawGrid = (ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);
        ctx.strokeStyle = '#ccc';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = "white";

        const stepX = dimensions.width / 16;
        const stepY = dimensions.height / 8;

        // Vertical lines
        for (let x = 0; x <= dimensions.width; x += stepX) {
            ctx.beginPath();
            ctx.moveTo(x, dimensions.height);
            ctx.lineTo(x, 0);
            ctx.stroke();
            ctx.fillText(x.toFixed(0), x, dimensions.height - 10);
        }

        // Horizontal lines
        for (let y = dimensions.height; y >= 0; y -= stepY) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(dimensions.width, y);
            ctx.stroke();
            ctx.fillText((dimensions.height - y).toFixed(0), 15, y);
        }
    };

    const updateGPSMap = ({ latitude, longitude }: SensorData['gpsCoordinates']) => {
        const frontCanvas = frontCanvasRef.current;
        const ctx = frontCanvas!.getContext("2d");
        ctx!.clearRect(0, 0, dimensions.width, dimensions.height);

        // Draw previous positions
        positions.forEach((position) => {
            ctx!.fillStyle = 'green';
            ctx!.beginPath();
            // @ts-ignore
            ctx!.arc(position.longitude * dimensions.width / 800, dimensions.height - position.latitude * dimensions.height / 400, 3, 0, 2 * Math.PI);
            ctx!.fill();
        });
        if (positions.length > 100) {
            setPositions(positions.slice(1));
        }
        // Draw drone
        ctx!.fillStyle = "red";
        ctx!.beginPath();
        ctx!.arc(longitude * dimensions.width / 800, dimensions.height - latitude * dimensions.height / 400, 7, 0, Math.PI * 2);
        ctx!.fill();
    };

    return (
        <div className="gps-plot">
            <canvas ref={backCanvasRef} width={dimensions.width} height={dimensions.height} />
            <canvas ref={frontCanvasRef} width={dimensions.width} height={dimensions.height} />
        </div>
    )
}