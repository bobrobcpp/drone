# Drone Telemetry Application

This application simulates and visualizes real-time telemetry data from a drone. It consists of a backend server that generates simulated drone data and a frontend interface for data visualization.

## Technical Stack

- Backend: Node.js with the [ws websocket library](https://github.com/websockets/ws)
- Frontend: React with [Recharts](https://github.com/recharts/recharts), [React Gauge Chart](https://github.com/Martin36/react-gauge-chart) and Canvas for GPS position
- Containerization: Docker and Docker Compose
- Data Streaming: Custom Node.js Readable stream

## Getting Started

1. Clone the repository
2. Run `docker-compose up --build` from project root to start the application
3. Access the frontend dashboard at `http://localhost`
  

   
![drone-simulator](https://github.com/user-attachments/assets/307d8559-4b27-4526-92bf-8b31868271fc)
