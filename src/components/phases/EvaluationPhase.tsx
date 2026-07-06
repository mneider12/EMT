import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function EvaluationPhase() {
  const { resetScenario, selectedPPE, equipmentState, completedActions } = useScenario();

  const evaluatePerformance = () => {
    const feedback: string[] = [];

    // PPE Evaluation
    if (!selectedPPE.includes('Nitrile Gloves')) {
      feedback.push('Failed to wear Nitrile Gloves (Required).');
    }
    if (!selectedPPE.includes('Safety Glasses') && !selectedPPE.includes('Face Shield')) {
      feedback.push('Failed to wear eye protection (Safety Glasses or Face Shield required).');
    }
    if (!selectedPPE.includes('Surgical Mask') && !selectedPPE.includes('N95 Mask') && !selectedPPE.includes('Respirator')) {
      feedback.push('Failed to wear a mask (Surgical Mask, N95 Mask, or Respirator required).');
    }
    if (selectedPPE.includes('Medical Gown')) {
      feedback.push('Wore a Medical Gown (Inappropriate for this scenario).');
    }

    // Equipment Evaluation
    const hasO2 = equipmentState.selected.includes('O2 bag') || equipmentState.applied.some(e => e.name === 'O2 bag');
    const hasAED = equipmentState.selected.includes('AED') || equipmentState.applied.some(e => e.name === 'AED');
    const hasOB = equipmentState.selected.includes('OB kit') || equipmentState.applied.some(e => e.name === 'OB kit');

    if (!hasO2) {
      feedback.push('Failed to bring O2 bag (Required).');
    }
    if (!hasAED) {
      feedback.push('Failed to bring AED (Required).');
    }
    if (hasOB) {
      feedback.push('Brought OB kit (Unnecessary for this scenario).');
    }

    // Assessment Evaluation
    const idxRespV = completedActions.indexOf('ASSESS_RESPONSIVENESS_VERBAL');
    const idxRespP = completedActions.indexOf('ASSESS_RESPONSIVENESS_PAIN');
    const idxPulse = completedActions.indexOf('ASSESS_PULSE');
    const idxComp = completedActions.indexOf('START_COMPRESSIONS');
    const idxAED = completedActions.indexOf('APPLY_AED');
    const idxCPR = completedActions.indexOf('START_CPR');

    // Rule: Must check both responsiveness
    if (idxRespV === -1 || idxRespP === -1) {
      feedback.push('Failed to check responsiveness (verbal and painful).');
    } else if (idxPulse !== -1 && (idxPulse < idxRespV || idxPulse < idxRespP)) {
      feedback.push('Failed to check responsiveness (verbal and painful) prior to checking pulse.');
    }

    // Rule: Must check pulse
    if (idxPulse === -1) {
      feedback.push('Failed to check pulse.');
    } else if ((idxComp !== -1 && idxComp < idxPulse) || (idxAED !== -1 && idxAED < idxPulse)) {
      feedback.push('Failed to check pulse prior to starting compressions or applying AED.');
    }

    // Rule: Must start compressions and apply AED
    if (idxComp === -1 || idxAED === -1) {
      feedback.push('Failed to start chest compressions and apply AED.');
    } else if (idxCPR !== -1 && (idxCPR < idxComp || idxCPR < idxAED)) {
      feedback.push('Failed to start chest compressions and apply AED prior to starting full CPR.');
    }

    const compRole = completedActions.includes('START_COMPRESSIONS_LEAD') ? 'Lead' : 
                     completedActions.includes('START_COMPRESSIONS_PARTNER') ? 'Partner' : null;
    const aedRole = equipmentState.applied.find(e => e.name === 'AED')?.appliedBy;

    if (compRole && aedRole && compRole === aedRole) {
      feedback.push(`Chest compressions and AED application were both performed by the ${compRole}. These tasks must be performed simultaneously by different EMTs.`);
    }

    // Inappropriate actions
    if (completedActions.includes('ASSESS_HEART_RATE')) {
      feedback.push('Assessed heart rate (Inappropriate: delays chest compressions).');
    }
    if (completedActions.includes('ASSESS_RESPIRATION_RATE')) {
      feedback.push('Assessed respiration rate (Inappropriate: delays chest compressions).');
    }

    return feedback;
  };

  const feedback = evaluatePerformance();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minHeight: 0 }}>
      <div style={{ flexShrink: 0 }}>
        <h2 className="dispatch-title">Scenario Complete</h2>
        
        <p className="scenario-desc" style={{ marginBottom: '16px', marginLeft: 'auto', marginRight: 'auto' }}>
          Paramedics have arrived on scene and taken over responsibility for the patient. 
          Your initial assessment and interventions are complete.
        </p>
      </div>

      <div style={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', marginBottom: '16px', textAlign: 'left', flex: 1, minHeight: 0, overflowY: 'auto' }}>
        <h3 style={{ color: 'var(--text-bright)', marginBottom: '16px', fontSize: '1.2rem', marginTop: 0 }}>Performance Evaluation</h3>
        {feedback.length === 0 ? (
          <div style={{ color: 'var(--success)', fontWeight: 'bold' }}>
            Excellent work! All protocols were followed correctly.
          </div>
        ) : (
          <ul style={{ color: '#ff4444', display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', margin: 0 }}>
            {feedback.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="options-grid" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', flexShrink: 0 }}>
        <button 
          className="option-btn" 
          onClick={() => resetScenario(false)}
        >
          Retry Scenario
        </button>
        <button 
          className="option-btn" 
          style={{ border: '1px solid var(--primary)' }}
          onClick={() => resetScenario(true)}
        >
          Complete Scenario (Home)
        </button>
      </div>
    </div>
  );
}
