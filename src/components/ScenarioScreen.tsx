import { useScenario } from '../context/ScenarioContext';
import { InitializationPhase } from './phases/InitializationPhase';
import { DispatchPhase } from './phases/DispatchPhase';
import { SceneArrivalPhase } from './phases/SceneArrivalPhase';
import { PPESelectionPhase } from './phases/PPESelectionPhase';
import { EquipmentSelectionPhase } from './phases/EquipmentSelectionPhase';
import { ApproachPatientPhase } from './phases/ApproachPatientPhase';
import { PatientAssessmentPhase } from './phases/PatientAssessmentPhase';
import './ScenarioScreen.css';

export function ScenarioScreen() {
  const { phase } = useScenario();

  return (
    <div className="message-box">
      {phase === 'INITIALIZATION' && <InitializationPhase />}
      {phase === 'DISPATCH' && <DispatchPhase />}
      {phase === 'SCENE_ARRIVAL' && <SceneArrivalPhase />}
      {phase === 'PPE_SELECTION' && <PPESelectionPhase />}
      {phase === 'EQUIPMENT_SELECTION' && <EquipmentSelectionPhase />}
      {phase === 'APPROACH_PATIENT' && <ApproachPatientPhase />}
      {phase === 'PATIENT_ASSESSMENT' && <PatientAssessmentPhase />}
    </div>
  );
}
