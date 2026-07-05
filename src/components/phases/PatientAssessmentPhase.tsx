import { useState } from 'react';
import { useScenario } from '../../context/ScenarioContext';
import '../ScenarioScreen.css';

export function PatientAssessmentPhase() {
  const [assessmentAction, setAssessmentAction] = useState<string | null>(null);
  
  const { 
    setPhase, 
    equipmentState, 
    setVitalsAssessed, 
    setCprConfig 
  } = useScenario();

  const [compressions, setCompressions] = useState<number | ''>('');
  const [respirations, setRespirations] = useState<number | ''>('');
  const [rateLow, setRateLow] = useState<number | ''>('');
  const [rateHigh, setRateHigh] = useState<number | ''>('');
  const [switchTime, setSwitchTime] = useState<number | ''>('');
  const [switchUnit, setSwitchUnit] = useState('');

  return (
    <>
      <h2 className="dispatch-title">Patient Assessment</h2>
      {!assessmentAction ? (
        <>
          <p className="scenario-desc">
            Select an assessment to perform on the patient.
          </p>
          <div className="options-grid">
            <button 
              className="option-btn" 
              onClick={() => setAssessmentAction('check_pulse')}
            >
              Check Pulse (Heart Rate)
            </button>
            <button 
              className="option-btn" 
              onClick={() => setAssessmentAction('perform_cpr')}
            >
              Perform CPR
            </button>
            <button 
              className="option-btn" 
              onClick={() => {
                setVitalsAssessed(prev => ({ ...prev, respiration: true }));
                alert(`Respiration rate is absent.`);
              }}
            >
              Assess Respiration Rate
            </button>
            {equipmentState.applied.includes('Blood Pressure Cuff') && (
              <button 
                className="option-btn" 
                onClick={() => setAssessmentAction('check_bp')}
              >
                Assess Blood Pressure
              </button>
            )}
            {equipmentState.applied.includes('Pulse Oximeter') && (
              <button 
                className="option-btn" 
                onClick={() => {
                  setVitalsAssessed(prev => ({ ...prev, spo2: true }));
                  alert(`SpO2 reading is error.`);
                }}
              >
                Assess SpO2
              </button>
            )}
          </div>
          <button 
            className="start-btn" 
            onClick={() => setPhase('SCENE_ARRIVAL')}
            style={{ marginTop: '24px' }}
          >
            Back to Scene Options
          </button>
        </>
      ) : assessmentAction === 'check_pulse' ? (
        <>
          <p className="scenario-desc">
            Select which artery to check for a pulse.
          </p>
          <div className="options-grid">
            {['Carotid', 'Brachial', 'Radial'].map((artery) => (
              <button
                key={artery}
                className="option-btn"
                onClick={() => {
                  setVitalsAssessed(prev => ({ ...prev, heartRate: true }));
                  alert(`Checked ${artery} pulse. Pulse is absent.`);
                  setAssessmentAction(null);
                }}
              >
                {artery} Artery
              </button>
            ))}
          </div>
          <button 
            className="start-btn" 
            onClick={() => setAssessmentAction(null)}
            style={{ marginTop: '24px' }}
          >
            Cancel
          </button>
        </>
      ) : assessmentAction === 'check_bp' ? (
        <>
          <p className="scenario-desc">
            You are preparing to measure the blood pressure.
          </p>
          <div className="options-grid">
            <button
              className="option-btn"
              onClick={() => {
                setVitalsAssessed(prev => ({ ...prev, bloodPressure: true }));
                alert(`Blood pressure is absent.`);
                setAssessmentAction(null);
              }}
            >
              Measure Blood Pressure
            </button>
          </div>
          <button 
            className="start-btn" 
            onClick={() => setAssessmentAction(null)}
            style={{ marginTop: '24px' }}
          >
            Cancel
          </button>
        </>
      ) : assessmentAction === 'perform_cpr' ? (
        <>
          <p className="scenario-desc">
            Configure CPR settings.
          </p>
          <div className="cpr-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-bright)' }}>Compression Ratio (Compressions : Respirations)</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="number" min="1" value={compressions} onChange={e => setCompressions(e.target.value === '' ? '' : Number(e.target.value))} style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-bright)' }} />
                <span style={{ color: 'var(--text-muted)' }}>:</span>
                <input type="number" min="0" value={respirations} onChange={e => setRespirations(e.target.value === '' ? '' : Number(e.target.value))} style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-bright)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-bright)' }}>Compression Rate (BPM)</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="number" min="1" value={rateLow} onChange={e => setRateLow(e.target.value === '' ? '' : Number(e.target.value))} style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-bright)' }} />
                <span style={{ color: 'var(--text-muted)' }}>to</span>
                <input type="number" min="1" value={rateHigh} onChange={e => setRateHigh(e.target.value === '' ? '' : Number(e.target.value))} style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-bright)' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ color: 'var(--text-bright)' }}>Switch Responders Every</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="number" min="1" value={switchTime} onChange={e => setSwitchTime(e.target.value === '' ? '' : Number(e.target.value))} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-bright)' }} />
                <select value={switchUnit} onChange={e => setSwitchUnit(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-dark)', color: 'var(--text-bright)' }}>
                  <option value="" disabled>Select unit...</option>
                  <option value="Minutes">Minutes</option>
                  <option value="Seconds">Seconds</option>
                  <option value="Cycles">Cycles</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button 
                className="option-btn" 
                onClick={() => {
                  setCprConfig({ compressions, respirations, rateLow, rateHigh, switchTime, switchUnit });
                  alert('CPR started.');
                  setAssessmentAction(null);
                }}
                style={{ flex: 1 }}
              >
                Start CPR
              </button>
              <button 
                className="start-btn" 
                onClick={() => setAssessmentAction(null)}
                style={{ flex: 1 }}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
