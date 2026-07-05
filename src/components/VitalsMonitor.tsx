import './VitalsMonitor.css';
import { useScenario } from '../context/ScenarioContext';

export function VitalsMonitor() {
  const { heartRateMeasured } = useScenario();

  return (
    <>
      {/* ECG Screen */}
      <div className="ecg-screen">
        <div className="ecg-grid"></div>
        <svg className="ecg-line" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path
            className="ecg-path"
            d="M 0,50 L 10,50 L 15,50 L 20,40 L 23,60 L 26,50 L 35,50 L 38,30 L 41,75 L 44,50 L 46,53 L 48,47 L 50,50 L 65,50 L 70,50 L 75,40 L 78,60 L 81,50 L 90,50 L 93,30 L 96,75 L 100,50"
          />
        </svg>
      </div>

      {/* Vitals Grid */}
      <div className="vitals-grid">
        {/* Heart Rate */}
        <div className="vital-card pulse">
          <span className="vital-label">HR</span>
          <div className="vital-value-container">
            <span className="vital-value">{heartRateMeasured ? '0' : '--'}</span>
            <span className="vital-unit">bpm</span>
          </div>
          <span className="heart-icon">♥</span>
        </div>

        {/* Blood Pressure */}
        <div className="vital-card blood-pressure">
          <span className="vital-label">BP</span>
          <div className="vital-value-container">
            <span className="vital-value">120/80</span>
            <span className="vital-unit">mmHg</span>
          </div>
        </div>

        {/* SpO2 */}
        <div className="vital-card spo2">
          <span className="vital-label">SpO2</span>
          <div className="vital-value-container">
            <span className="vital-value">98</span>
            <span className="vital-unit">%</span>
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
    </>
  );
}
