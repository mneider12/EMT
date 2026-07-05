import { useState } from 'react';
import { useScenario } from '../context/ScenarioContext';
import './InventoryHUD.css';

export function InventoryHUD() {
  const { 
    selectedPPE, 
    selectedEquipment, 
    activeEquipment,
    setActiveEquipment,
    bagContents,
    setBagContents
  } = useScenario();
  const [isBagOpen, setIsBagOpen] = useState(false);

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
              <div key={item}>
                <button 
                  className="inventory-item equipment-item" 
                  onClick={() => {
                    if (item === 'Trauma bag') {
                      setIsBagOpen(!isBagOpen);
                    } else {
                      alert(`Using ${item}...`);
                    }
                  }}
                >
                  {item}
                </button>
                {item === 'Trauma bag' && isBagOpen && bagContents.length > 0 && (
                  <div style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {bagContents.map(subItem => (
                      <button
                        key={subItem}
                        className="inventory-item equipment-item"
                        style={{ borderLeft: '2px solid var(--primary)' }}
                        onClick={() => {
                          setActiveEquipment(subItem);
                          setBagContents(bagContents.filter(i => i !== subItem));
                        }}
                      >
                        {subItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="inventory-item empty">None</div>
          )}
        </div>
      </div>
      </div>

      {activeEquipment && (
        <div className="hud-panel">
          <h3 className="inventory-title">Applied</h3>
          <div className="inventory-section">
            <h4 className="inventory-subtitle">On Patient</h4>
            <div className="inventory-list">
              <div className="inventory-item ppe-item">{activeEquipment}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
