import { useState } from 'react';
import { useScenario } from '../context/ScenarioContext';
import './InventoryHUD.css';

export function InventoryHUD() {
  const { 
    selectedPPE, 
    equipmentState,
    setEquipmentState,
    phase,
    toggleEquipment
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
          {equipmentState.selected.length > 0 ? (
            equipmentState.selected.map(item => (
              <div key={item}>
                <button 
                  className="inventory-item equipment-item" 
                  disabled={phase !== 'PATIENT_ASSESSMENT'}
                  onClick={() => {
                    if (item === 'Trauma bag') {
                      setIsBagOpen(!isBagOpen);
                    } else {
                      setEquipmentState(prev => ({
                        ...prev,
                        applied: [...prev.applied, item]
                      }));
                      toggleEquipment(item);
                    }
                  }}
                >
                  {item}
                </button>
                {item === 'Trauma bag' && isBagOpen && equipmentState.bagContents.length > 0 && (
                  <div style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {equipmentState.bagContents.map(subItem => (
                      <button
                        key={subItem}
                        className="inventory-item equipment-item"
                        style={{ borderLeft: '2px solid var(--primary)' }}
                        disabled={phase !== 'PATIENT_ASSESSMENT'}
                        onClick={() => {
                          setEquipmentState(prev => ({
                            ...prev,
                            applied: [...prev.applied, subItem],
                            bagContents: prev.bagContents.filter(i => i !== subItem)
                          }));
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

      {equipmentState.applied.length > 0 && (
        <div className="hud-panel">
          <h3 className="inventory-title">Applied</h3>
          <div className="inventory-section">
            <h4 className="inventory-subtitle">On Patient</h4>
            <div className="inventory-list">
              {equipmentState.applied.map(equip => (
                <div key={equip} className="inventory-item ppe-item">{equip}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
