import { useState, useEffect } from 'react';
import './App.css';

type SimulationPhase = 'INITIALIZATION' | 'DISPATCH' | 'SCENE_ARRIVAL';

function App() {
  const [timestamp, setTimestamp] = useState('');
  const [phase, setPhase] = useState<SimulationPhase>('INITIALIZATION');

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
          {/* ECG Screen */}
          <div className="ecg-screen">
            <div className="ecg-grid"></div>
            <svg className="ecg-line" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                className="ecg-path"
                d="M 0,50 L 10,50 L 15,50 L 20,40 L 23,60 L 26,50 L 35,50 L 38,30 L 41,75 L 44,50 L 46,53 L 48,47 L 50,50 L 65,50 L 70,50 L 75,40 L 78,60 L 81,50 L 90,50 L 93,30 L 96,75 L 100,50"
              />
            </svg>
          </div>

          {/* Vitals Grid */}
          <div className="vitals-grid">
            {/* Heart Rate */}
            <div className="vital-card pulse">
              <span className="vital-label">HR</span>
              <div className="vital-value-container">
                <span className="vital-value">80</span>
                <span className="vital-unit">bpm</span>
              </div>
              <span className="heart-icon">♥</span>
            </div>

            {/* Blood Pressure */}
            <div className="vital-card blood-pressure">
              <span className="vital-label">BP</span>
              <div className="vital-value-container">
                <span className="vital-value">120/80</span>
                <span className="vital-unit">mmHg</span>
              </div>
            </div>

            {/* SpO2 */}
            <div className="vital-card spo2">
              <span className="vital-label">SpO2</span>
              <div className="vital-value-container">
                <span className="vital-value">98</span>
                <span className="vital-unit">%</span>
              </div>
            </div>

            {/* Respiratory Rate */}
            <div className="vital-card temp">
              <span className="vital-label">RR</span>
              <div className="vital-value-container">
                <span className="vital-value">16</span>
                <span className="vital-unit">/min</span>
              </div>
            </div>
          </div>

          {/* Message Box */}
          <div className="message-box">
            {phase === 'INITIALIZATION' && (
              <>
                <h1 className="hello-world-title">Hello, World!</h1>
                <p className="hello-world-desc">
                  System initialization complete. The EMT Response Training Simulator is online and ready. 
                  In subsequent phases, you will be able to assess clinical presentations, perform physical exams, 
                  administer interventions, and coordinate patient transport according to NREMT guidelines.
                </p>
                <button className="start-btn" onClick={() => setPhase('DISPATCH')}>
                  Initialize Simulation
                </button>
              </>
            )}

            {phase === 'DISPATCH' && (
              <>
                <h2 className="dispatch-title">Incoming Dispatch</h2>
                <div className="dispatch-text">
                  "Respond to an unresponsive adult. Caller reports patient is not breathing and has no pulse. Police and Fire are en route."
                </div>
                <button className="start-btn" onClick={() => setPhase('SCENE_ARRIVAL')}>
                  Arrive on Scene
                </button>
              </>
            )}

            {phase === 'SCENE_ARRIVAL' && (
              <>
                <h2 className="dispatch-title">Scene Arrival</h2>
                <p className="hello-world-desc">
                  You have arrived on scene. Police are securing the area. What are your first actions?
                </p>
                <div className="options-grid">
                  <button className="option-btn" onClick={() => alert('BSI donned. Scene is secure.')}>
                    Don BSI & PPE
                  </button>
                  <button className="option-btn" onClick={() => alert('AED and Jump Bag retrieved.')}>
                    Grab AED & Jump Bag
                  </button>
                  <button className="option-btn" onClick={() => alert('Approaching patient...')}>
                    Assess Patient
                  </button>
                </div>
              </>
            )}
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
