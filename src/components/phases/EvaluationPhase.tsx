import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function EvaluationPhase() {
  const { resetScenario } = useScenario();

  return (
    <>
      <h2 className="dispatch-title">Scenario Complete</h2>
      
      <p className="scenario-desc" style={{ marginBottom: '32px' }}>
        Paramedics have arrived on scene and taken over responsibility for the patient. 
        Your initial assessment and interventions are complete.
      </p>

      <div style={{ backgroundColor: 'var(--bg-dark)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px', marginBottom: '32px', textAlign: 'left' }}>
        <h3 style={{ color: 'var(--text-bright)', marginBottom: '16px', fontSize: '1.2rem' }}>Performance Evaluation</h3>
        <p style={{ color: 'var(--text-muted)' }}>
          (Placeholder: A detailed evaluation of actions taken will be displayed here.)
        </p>
      </div>

      <div className="options-grid" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
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
    </>
  );
}
