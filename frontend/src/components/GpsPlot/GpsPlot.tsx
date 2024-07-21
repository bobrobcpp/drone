import { useEffect, useRef, useState } from "react";
import { useSensorContext } from "../../context/SensorContext"
import { SensorData } from "../../types/SensorData";

export default function GpsPlot() {
    const sensorData = useSensorContext();
    const frontCanvasRef = useRef<HTMLCanvasElement>(null);
    const backCanvasRef = useRef<HTMLCanvasElement>(null);
    // Set fixed grid area in this implementation
    const MAX_X = 800;
    const MAX_Y = 400;
    const [positions, setPositions] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
    const [scalingFactor, setScalingFactor] = useState({ x: dimensions.width / MAX_X, y: dimensions.height / MAX_Y });

    // Update dimensions based on viewport width
    useEffect(() => {
        const updateDimensions = () => {
            const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
            const newWidth = Math.min(vw - 40, 800);
            setDimensions({ width: newWidth, height: newWidth / 2 });
            setScalingFactor({ x: newWidth / MAX_X, y: newWidth / 2 / MAX_Y });
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

        const step = 100;

        // Vertical lines
        for (let x = 0; x <= MAX_X; x += step) {
            ctx.beginPath();
            ctx.moveTo(x * scalingFactor.x, dimensions.height);
            ctx.lineTo(x * scalingFactor.x, 0);
            ctx.stroke();
            // Don't show 0 as it would be off the canvas
            ctx.fillText(x != 0 ? x.toFixed(0) : '', x * scalingFactor.x, dimensions.height - 10);
        }

        // Horizontal lines
        for (let y = MAX_Y; y >= 0; y -= step) {
            ctx.beginPath();
            ctx.moveTo(0, y * scalingFactor.y);
            ctx.lineTo(dimensions.width, y * scalingFactor.y);
            ctx.stroke();
            ctx.fillText((MAX_Y - y).toFixed(0), 15, y * scalingFactor.y);
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
            ctx!.arc(position.longitude * scalingFactor.x, dimensions.height - position.latitude * scalingFactor.y, 3, 0, 2 * Math.PI);
            ctx!.fill();
        });
        if (positions.length > 100) {
            setPositions(positions.slice(1));
        }
        // Draw drone
        ctx!.fillStyle = "red";
        ctx!.beginPath();
        ctx!.arc(longitude * scalingFactor.x, dimensions.height - latitude * scalingFactor.y, 7, 0, Math.PI * 2);
        ctx!.fill();
    };

    return (
        <div className="gps-plot">
            <canvas ref={backCanvasRef} width={dimensions.width + 20} height={dimensions.height} />
            <canvas ref={frontCanvasRef} width={dimensions.width} height={dimensions.height} />
        </div>
    )
}