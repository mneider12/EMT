import { useState, useEffect } from 'react';
import { VitalsMonitor } from './components/VitalsMonitor';
import { InventoryHUD } from './components/InventoryHUD';
import { ScenarioScreen } from './components/ScenarioScreen';
import { ScenarioProvider, useScenario } from './context/ScenarioContext';
import './App.css';

function HeaderControls() {
  const { resetScenario, phase } = useScenario();

  if (phase === 'EVALUATION') return null;

  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <button 
        style={{ padding: '6px 12px', background: 'var(--bg-dark)', color: 'var(--text-bright)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 'bold' }}
        onClick={() => {
          if (window.confirm('Are you sure you want to reset the scenario? All progress will be lost.')) {
            resetScenario(false);
          }
        }}
      >
        Reset Scenario
      </button>
      <button 
        style={{ padding: '6px 12px', background: 'var(--bg-dark)', color: 'var(--text-bright)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: '12px', fontWeight: 'bold' }}
        onClick={() => {
          if (window.confirm('Are you sure you want to go home? All progress will be lost.')) {
            resetScenario(true);
          }
        }}
      >
        Home
      </button>
    </div>
  );
}

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
            <HeaderControls />
          </div>

          {/* Body */}
          <div className="monitor-body">
            <InventoryHUD />

            <div className="main-content">
              <VitalsMonitor />
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
