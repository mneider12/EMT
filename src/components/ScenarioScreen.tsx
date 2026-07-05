import { useState } from 'react';
import { type SimulationPhase, AVAILABLE_PPE, AVAILABLE_EQUIPMENT } from '../types/scenario';
import { useScenario } from '../context/ScenarioContext';
import './ScenarioScreen.css';

export function ScenarioScreen() {
  const [showScenarioList, setShowScenarioList] = useState(false);
  const [assessmentAction, setAssessmentAction] = useState<string | null>(null);
  const {
    phase,
    setPhase,
    selectedPPE,
    togglePPE,
    selectedEquipment,
    toggleEquipment,
    completedActions,
    markActionCompleted,
    setHeartRateMeasured,
    setImpressionRevealed,
    appliedEquipment,
    setBloodPressureMeasured,
    setSpo2Measured,
    setRespirationMeasured,
    setCprConfig
  } = useScenario();

  const [compressions, setCompressions] = useState<number | ''>('');
  const [respirations, setRespirations] = useState<number | ''>('');
  const [rateLow, setRateLow] = useState<number | ''>('');
  const [rateHigh, setRateHigh] = useState<number | ''>('');
  const [switchTime, setSwitchTime] = useState<number | ''>('');
  const [switchUnit, setSwitchUnit] = useState('');

  return (
    <div className="message-box">
      {phase === 'INITIALIZATION' && !showScenarioList && (
        <>
          <h1 className="scenario-title" style={{ fontSize: '36px', marginBottom: '16px' }}>EMT Simulator</h1>
          <div className="options-grid" style={{ width: '100%', maxWidth: '500px' }}>
            <button className="option-btn" onClick={() => setShowScenarioList(true)}>
              Select Scenario
            </button>
            <button className="option-btn" onClick={() => setPhase('DISPATCH')}>
              Initiate Dispatch (Random)
            </button>
          </div>
        </>
      )}

      {phase === 'INITIALIZATION' && showScenarioList && (
        <>
          <h2 className="dispatch-title">Select Scenario</h2>
          <div className="options-grid" style={{ width: '100%', maxWidth: '500px' }}>
            <button className="option-btn" onClick={() => setPhase('DISPATCH')}>
              Unresponsive Adult CPR
            </button>
          </div>
          <button className="start-btn" style={{ marginTop: '24px' }} onClick={() => setShowScenarioList(false)}>
            Back
          </button>
        </>
      )}

      {phase === 'DISPATCH' && (
        <>
          <h2 className="dispatch-title">Incoming Dispatch</h2>
          <div className="dispatch-text">
            Respond to an unresponsive adult. Caller reports patient is not breathing and has no pulse. Police and Fire are en route.
          </div>
          <button className="start-btn" onClick={() => setPhase('SCENE_ARRIVAL')}>
            Arrive on Scene
          </button>
        </>
      )}

      {phase === 'SCENE_ARRIVAL' && (
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
      )}

      {phase === 'PPE_SELECTION' && (
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
      )}

      {phase === 'EQUIPMENT_SELECTION' && (
        <>
          <h2 className="dispatch-title">Select Equipment</h2>
          <p className="scenario-desc">
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

      {phase === 'APPROACH_PATIENT' && (
        <>
          <h2 className="dispatch-title">Initial Impression</h2>
          <div className="dispatch-text">
            You see 1 patient, lying supine. Skin is pale, no noticeable breathing. The patient is not alert to you.
          </div>
          <button className="start-btn" onClick={() => setPhase('PATIENT_ASSESSMENT')}>
            Proceed to Assessment
          </button>
        </>
      )}

      {phase === 'PATIENT_ASSESSMENT' && (
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
                    setRespirationMeasured(true);
                    alert(`Respiration rate is absent.`);
                  }}
                >
                  Assess Respiration Rate
                </button>
                {appliedEquipment.includes('Blood Pressure Cuff') && (
                  <button 
                    className="option-btn" 
                    onClick={() => setAssessmentAction('check_bp')}
                  >
                    Assess Blood Pressure
                  </button>
                )}
                {appliedEquipment.includes('Pulse Oximeter') && (
                  <button 
                    className="option-btn" 
                    onClick={() => {
                      setSpo2Measured(true);
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
                      setHeartRateMeasured(true);
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
                    setBloodPressureMeasured(true);
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
      )}
    </div>
  );
}
