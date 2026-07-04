import { AVAILABLE_PPE, AVAILABLE_EQUIPMENT } from '../types/scenario';
import { useScenario } from '../context/ScenarioContext';
import './ScenarioScreen.css';

export function ScenarioScreen() {
  const {
    phase,
    setPhase,
    selectedPPE,
    togglePPE,
    selectedEquipment,
    toggleEquipment,
    completedActions,
    markActionCompleted
  } = useScenario();

  return (
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
                if (!completedActions.includes('PPE')) {
                  alert('WARNING: Approaching without ensuring BSI first!');
                }
                alert('Moving to Assess Patient phase... (To be implemented)');
              }}
            >
              Assess Patient
            </button>
          </div>
        </>
      )}

      {phase === 'PPE_SELECTION' && (
        <>
          <h2 className="dispatch-title">Select PPE</h2>
          <p className="hello-world-desc">
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
      )}

      {phase === 'EQUIPMENT_SELECTION' && (
        <>
          <h2 className="dispatch-title">Select Equipment</h2>
          <p className="hello-world-desc">
            Select the equipment you want to bring from the rig to the scene.
          </p>
          <div className="options-grid">
            {AVAILABLE_EQUIPMENT.map(item => (
              <button 
                key={item}
                className={`option-btn ${selectedEquipment.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleEquipment(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button 
            className="start-btn" 
            onClick={() => {
              markActionCompleted('EQUIPMENT');
              setPhase('SCENE_ARRIVAL');
            }}
            style={{ marginTop: '24px' }}
          >
            Confirm Selection
          </button>
        </>
      )}
    </div>
  );
}
