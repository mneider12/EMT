import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function DispatchPhase() {
  const { setPhase } = useScenario();

  return (
    <>
      <h2 className="dispatch-title">Incoming Dispatch</h2>
      <div className="dispatch-text">
        Respond to an unresponsive adult. Caller reports patient is not breathing and has no pulse. Police and Fire are en route.
      </div>
      <button className="start-btn" onClick={() => setPhase('SCENE_ARRIVAL')}>
        Arrive on Scene
      </button>
    </>
  );
}
