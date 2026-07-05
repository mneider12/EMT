import { useState } from 'react';
import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function InitializationPhase() {
  const { setPhase } = useScenario();
  const [showScenarioList, setShowScenarioList] = useState(false);

  if (showScenarioList) {
    return (
      <>
        <h2 className="dispatch-title">Select Scenario</h2>
        <div className="options-grid" style={{ width: '100%', maxWidth: '500px' }}>
          <button className="option-btn" onClick={() => setPhase('DISPATCH')}>
            Unresponsive Adult CPR
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
        <button className="option-btn" onClick={() => setPhase('DISPATCH')}>
          Initiate Dispatch (Random)
        </button>
      </div>
    </>
  );
}
