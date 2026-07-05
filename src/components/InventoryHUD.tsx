import { useScenario } from '../context/ScenarioContext';
import './InventoryHUD.css';

export function InventoryHUD() {
  const { selectedPPE, selectedEquipment, impressionRevealed } = useScenario();

  return (
    <div className="side-hud">
      <div className="hud-panel">
        <h3 className="inventory-title">Inventory</h3>
      
      <div className="inventory-section">
        <h4 className="inventory-subtitle">PPE</h4>
        <div className="inventory-list">
          {selectedPPE.length > 0 ? (
            selectedPPE.map(item => (
              <div key={item} className="inventory-item ppe-item">{item}</div>
            ))
          ) : (
            <div className="inventory-item empty">None</div>
          )}
        </div>
      </div>

      <div className="inventory-section">
        <h4 className="inventory-subtitle">Equipment</h4>
        <div className="inventory-list">
          {selectedEquipment.length > 0 ? (
            selectedEquipment.map(item => (
              <button key={item} className="inventory-item equipment-item" onClick={() => alert(`Using ${item}...`)}>{item}</button>
            ))
          ) : (
            <div className="inventory-item empty">None</div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
