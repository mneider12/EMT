import { useScenario } from '../../context/ScenarioContext';
import { AVAILABLE_EQUIPMENT } from '../../types/scenario';
import '../ScenarioScreen.css';

export function EquipmentSelectionPhase() {
  const { setPhase, equipmentState, toggleEquipment, markActionCompleted } = useScenario();

  return (
    <>
      <h2 className="dispatch-title">Select Equipment</h2>
      <p className="scenario-desc">
        Select the equipment you want to bring from the rig to the scene.
      </p>
      <div className="options-grid">
        {AVAILABLE_EQUIPMENT.map(item => (
          <button 
            key={item}
            className={`option-btn ${equipmentState.selected.includes(item) ? 'selected' : ''}`}
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
  );
}
