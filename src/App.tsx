import { useState, useEffect } from 'react';
import { VitalsMonitor } from './components/VitalsMonitor';
import { InventoryHUD } from './components/InventoryHUD';
import { ScenarioScreen } from './components/ScenarioScreen';
import { ScenarioProvider } from './context/ScenarioContext';
import './App.css';

function App() {
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScenarioProvider>
      <div className="app-container">
        <div className="monitor-card">
          {/* Header */}
          <div className="monitor-header">
            <div className="system-title">EMT Scenario Trainer</div>
            <div className="system-status">VITAL SIGNS: RUNNING</div>
          </div>

          {/* Body */}
          <div className="monitor-body">
            <VitalsMonitor />

            {/* Scenario Container */}
            <div className="scenario-container">
              <InventoryHUD />
              <ScenarioScreen />
            </div>
          </div>

          {/* Footer */}
          <div className="monitor-footer">
            <div>SYS STATUS: SYS_OK</div>
            <div>LOC TIME: {timestamp}</div>
            <div>BUILD: 2026.06.12</div>
          </div>
        </div>
      </div>
    </ScenarioProvider>
  );
}

export default App;
