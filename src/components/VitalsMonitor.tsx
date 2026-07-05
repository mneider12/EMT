import './VitalsMonitor.css';
import { useScenario } from '../context/ScenarioContext';

export function VitalsMonitor() {
  const { heartRateMeasured, impressionRevealed, bloodPressureMeasured, spo2Measured } = useScenario();

  return (
    <>
      {/* Vitals Grid */}
      <div className="vitals-grid">
        {/* Heart Rate */}
        <div className="vital-card pulse">
          <span className="vital-label">HR</span>
          <div className="vital-value-container">
            <span className="vital-value">{heartRateMeasured ? 'Absent' : '--'}</span>
            {!heartRateMeasured && <span className="vital-unit">bpm</span>}
          </div>
          <span className="heart-icon">♥</span>
        </div>

        {/* Blood Pressure */}
        <div className="vital-card blood-pressure">
          <span className="vital-label">BP</span>
          <div className="vital-value-container">
            <span className="vital-value">{bloodPressureMeasured ? 'Absent' : '--/--'}</span>
            {!bloodPressureMeasured && <span className="vital-unit">mmHg</span>}
          </div>
        </div>

        {/* SpO2 */}
        <div className="vital-card spo2">
          <span className="vital-label">SpO2</span>
          <div className="vital-value-container">
            <span className="vital-value">{spo2Measured ? 'Error' : '--'}</span>
            {!spo2Measured && <span className="vital-unit">%</span>}
          </div>
        </div>

        {/* Respiratory Rate */}
        <div className="vital-card temp">
          <span className="vital-label">RR</span>
          <div className="vital-value-container">
            <span className="vital-value">16</span>
            <span className="vital-unit">/min</span>
          </div>
        </div>
      </div>

      {/* General Impression */}
      {/* General Impression */}
      <div className="hud-panel" style={{ marginTop: '24px', flexDirection: 'row', justifyContent: 'space-around', padding: '16px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>LOC</span>
          <span style={{ fontSize: '16px', color: 'var(--text-bright)' }}>{impressionRevealed ? 'Unresponsive' : '--'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>Skin Signs</span>
          <span style={{ fontSize: '16px', color: 'var(--text-bright)' }}>{impressionRevealed ? 'Pale' : '--'}</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 'bold' }}>WOB</span>
          <span style={{ fontSize: '16px', color: 'var(--text-bright)' }}>{impressionRevealed ? 'Apneic' : '--'}</span>
        </div>
      </div>
    </>
  );
}
