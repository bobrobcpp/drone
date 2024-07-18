export function connectWebSocket(onDataReceived) {
    const wsUrl = "ws://localhost:3000/telemetry";
    const socket = new WebSocket(wsUrl);

    socket.onopen = (event) => {
        console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onDataReceived(data);
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
}