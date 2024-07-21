import { SensorData } from '../types/SensorData';

export function connectWebSocket(onDataReceived: (data: SensorData) => void) {
    const wsUrl = "ws://localhost:4000/telemetry";
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
        console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onDataReceived(data);
    };

    socket.onerror = (error) => {
        console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
        console.log("Disconnected from WebSocket server");
    };

    return () => {
        socket.close();
    };
}