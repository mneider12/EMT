import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function ApproachPatientPhase() {
  const { setPhase } = useScenario();

  return (
    <>
      <h2 className="dispatch-title">Initial Impression</h2>
      <div className="dispatch-text">
        You see 1 patient, lying supine. Skin is pale, no noticeable breathing. The patient is not alert to you.
      </div>
      <button className="start-btn" onClick={() => setPhase('PATIENT_ASSESSMENT')}>
        Proceed to Assessment
      </button>
    </>
  );
}
