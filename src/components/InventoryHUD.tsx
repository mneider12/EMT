import { useState } from 'react';
import { useScenario } from '../context/ScenarioContext';
import './InventoryHUD.css';

export function InventoryHUD() {
  const { 
    selectedPPE, 
    equipmentState,
    setEquipmentState,
    phase,
    toggleEquipment,
    activeRole
  } = useScenario();
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [pendingEquipment, setPendingEquipment] = useState<string | null>(null);

  const applyEquipment = (item: string, role: 'Lead' | 'Partner') => {
    setEquipmentState(prev => ({
      ...prev,
      applied: [...prev.applied, { name: item, appliedBy: role }]
    }));
    toggleEquipment(item);
    setPendingEquipment(null);
  };

  const applyBagEquipment = (item: string, role: 'Lead' | 'Partner') => {
    setEquipmentState(prev => ({
      ...prev,
      applied: [...prev.applied, { name: item, appliedBy: role }],
      bagContents: prev.bagContents.filter(i => i !== item)
    }));
    setPendingEquipment(null);
  };

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
                {pendingEquipment === item ? (
                  <div className="inventory-item equipment-item" style={{ flexDirection: 'column', gap: '8px', cursor: 'default' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--text-bright)' }}>Who will apply {item}?</div>
                    <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                      <button 
                        style={{ flex: 1, padding: '4px', background: activeRole === 'Lead' ? 'var(--primary)' : 'var(--bg-dark)', color: activeRole === 'Lead' ? '#000' : 'var(--text-bright)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => applyEquipment(item, 'Lead')}
                      >
                        Lead
                      </button>
                      <button 
                        style={{ flex: 1, padding: '4px', background: activeRole === 'Partner' ? 'var(--primary)' : 'var(--bg-dark)', color: activeRole === 'Partner' ? '#000' : 'var(--text-bright)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => applyEquipment(item, 'Partner')}
                      >
                        Partner
                      </button>
                    </div>
                    <button style={{ width: '100%', padding: '4px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }} onClick={() => setPendingEquipment(null)}>Cancel</button>
                  </div>
                ) : (
                  <button 
                    className="inventory-item equipment-item" 
                    disabled={phase !== 'PATIENT_ASSESSMENT'}
                    onClick={() => {
                      if (item === 'Trauma bag') {
                        setIsBagOpen(!isBagOpen);
                      } else {
                        setPendingEquipment(item);
                      }
                    }}
                  >
                    {item}
                  </button>
                )}
                {item === 'Trauma bag' && isBagOpen && equipmentState.bagContents.length > 0 && (
                  <div style={{ paddingLeft: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {equipmentState.bagContents.map(subItem => (
                      <div key={subItem}>
                        {pendingEquipment === subItem ? (
                          <div className="inventory-item equipment-item" style={{ flexDirection: 'column', gap: '8px', cursor: 'default', borderLeft: '2px solid var(--primary)' }}>
                            <div style={{ fontWeight: 'bold', color: 'var(--text-bright)' }}>Who will apply {subItem}?</div>
                            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                              <button 
                                style={{ flex: 1, padding: '4px', background: activeRole === 'Lead' ? 'var(--primary)' : 'var(--bg-dark)', color: activeRole === 'Lead' ? '#000' : 'var(--text-bright)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => applyBagEquipment(subItem, 'Lead')}
                              >
                                Lead
                              </button>
                              <button 
                                style={{ flex: 1, padding: '4px', background: activeRole === 'Partner' ? 'var(--primary)' : 'var(--bg-dark)', color: activeRole === 'Partner' ? '#000' : 'var(--text-bright)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}
                                onClick={() => applyBagEquipment(subItem, 'Partner')}
                              >
                                Partner
                              </button>
                            </div>
                            <button style={{ width: '100%', padding: '4px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer' }} onClick={() => setPendingEquipment(null)}>Cancel</button>
                          </div>
                        ) : (
                          <button
                            className="inventory-item equipment-item"
                            style={{ borderLeft: '2px solid var(--primary)' }}
                            disabled={phase !== 'PATIENT_ASSESSMENT'}
                            onClick={() => {
                              setPendingEquipment(subItem);
                            }}
                          >
                            {subItem}
                          </button>
                        )}
                      </div>
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
              {equipmentState.applied.map((equip, i) => (
                <div key={i} className="inventory-item ppe-item">{equip.name}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
