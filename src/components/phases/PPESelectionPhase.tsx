import { useScenario } from '../../context/ScenarioContext';
import { AVAILABLE_PPE } from '../../types/scenario';
import '../ScenarioScreen.css';

export function PPESelectionPhase() {
  const { setPhase, selectedPPE, togglePPE, markActionCompleted } = useScenario();

  return (
    <>
      <h2 className="dispatch-title">Select PPE</h2>
      <p className="scenario-desc">
        Select the appropriate Personal Protective Equipment for this scenario.
      </p>
      <div className="options-grid">
        {AVAILABLE_PPE.map(item => (
          <button 
            key={item}
            className={`option-btn ${selectedPPE.includes(item) ? 'selected' : ''}`}
            onClick={() => togglePPE(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <button 
        className="start-btn" 
        onClick={() => {
          markActionCompleted('PPE');
          setPhase('SCENE_ARRIVAL');
        }}
        style={{ marginTop: '24px' }}
      >
        Confirm Selection
      </button>
    </>
  );
}
