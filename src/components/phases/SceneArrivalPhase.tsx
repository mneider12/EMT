import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function SceneArrivalPhase() {
  const { setPhase, completedActions, setImpressionRevealed } = useScenario();

  return (
    <>
      <h2 className="dispatch-title">Scene Arrival</h2>
      <p className="scenario-desc">
        You have arrived on scene. Police are securing the area. What are your first actions?
      </p>
      <div className="options-grid">
        <button 
          className={`option-btn ${completedActions.includes('PPE') ? 'action-completed' : ''}`}
          onClick={() => setPhase('PPE_SELECTION')}
        >
          Don BSI & PPE
        </button>
        <button 
          className={`option-btn ${completedActions.includes('EQUIPMENT') ? 'action-completed' : ''}`}
          onClick={() => setPhase('EQUIPMENT_SELECTION')}
        >
          Select Equipment
        </button>
        <button 
          className="option-btn" 
          onClick={() => {
            setImpressionRevealed(true);
            setPhase('APPROACH_PATIENT');
          }}
        >
          Approach Patient
        </button>
      </div>
    </>
  );
}
