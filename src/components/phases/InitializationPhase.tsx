import { useState } from 'react';
import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function InitializationPhase() {
  const { setPhase, setActiveScenario } = useScenario();
  const [showScenarioList, setShowScenarioList] = useState(false);

  if (showScenarioList) {
    return (
      <>
        <h2 className="dispatch-title">Select Scenario</h2>
        <div className="options-grid" style={{ width: '100%', maxWidth: '500px' }}>
          <button className="option-btn" onClick={() => { setActiveScenario('unresponsive_cpr'); setPhase('DISPATCH'); }}>
            Unresponsive Adult CPR
          </button>
          <button className="option-btn" onClick={() => { setActiveScenario('disoriented_male'); setPhase('DISPATCH'); }}>
            Disoriented 35-year-old Male
          </button>
        </div>
        <button className="start-btn" style={{ marginTop: '24px' }} onClick={() => setShowScenarioList(false)}>
          Back
        </button>
      </>
    );
  }

  return (
    <>
      <h1 className="scenario-title" style={{ fontSize: '36px', marginBottom: '16px' }}>EMT Simulator</h1>
      <div className="options-grid" style={{ width: '100%', maxWidth: '500px' }}>
        <button className="option-btn" onClick={() => setShowScenarioList(true)}>
          Select Scenario
        </button>
        <button className="option-btn" onClick={() => {
          const scenarios = ['unresponsive_cpr', 'disoriented_male'] as const;
          setActiveScenario(scenarios[Math.floor(Math.random() * scenarios.length)]);
          setPhase('DISPATCH');
        }}>
          Initiate Dispatch (Random)
        </button>
      </div>
    </>
  );
}
