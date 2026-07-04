import { useState, useEffect } from 'react';
import type { SimulationPhase } from './types/scenario';
import { VitalsMonitor } from './components/VitalsMonitor';
import { InventoryHUD } from './components/InventoryHUD';
import { ScenarioScreen } from './components/ScenarioScreen';
import './App.css';

function App() {
  const [timestamp, setTimestamp] = useState('');
  const [phase, setPhase] = useState<SimulationPhase>('INITIALIZATION');
  const [selectedPPE, setSelectedPPE] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const togglePPE = (item: string) => {
    setSelectedPPE(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleEquipment = (item: string) => {
    setSelectedEquipment(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

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
    <div className="app-container">
      <div className="monitor-card">
        {/* Header */}
        <div className="monitor-header">
          <div className="system-title">NREMT Scenario Trainer</div>
          <div className="system-status">VITAL SIGNS: RUNNING</div>
        </div>

        {/* Body */}
        <div className="monitor-body">
          <VitalsMonitor />

          {/* Scenario Container */}
          <div className="scenario-container">
            <InventoryHUD 
              selectedPPE={selectedPPE} 
              selectedEquipment={selectedEquipment} 
            />
            
            <ScenarioScreen 
              phase={phase}
              setPhase={setPhase}
              selectedPPE={selectedPPE}
              togglePPE={togglePPE}
              selectedEquipment={selectedEquipment}
              toggleEquipment={toggleEquipment}
              completedActions={completedActions}
              setCompletedActions={setCompletedActions}
            />
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
  );
}

export default App;
