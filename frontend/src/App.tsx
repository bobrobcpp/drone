import { SensorProvider } from './context/SensorContext';
import Dashboard from './components/Dashboard/Dashboard';

import "./App.css";

function App() {
    return (
        <SensorProvider>
            <div className="App">
                <Dashboard />
            </div>
        </SensorProvider>
    );
}

export default App;