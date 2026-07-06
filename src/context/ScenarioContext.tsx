import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { SimulationPhase } from '../types/scenario';

export type CPRConfig = {
  type: 'cpr' | 'compressions';
  compressions: number | string;
  respirations: number | '';
  rateLow: number | '';
  rateHigh: number | '';
  switchTime: number | '';
  switchUnit: string;
};

export type VitalsAssessed = {
  heartRate: boolean;
  bloodPressure: boolean;
  spo2: boolean;
  respiration: boolean;
};

export type AppliedEquipment = {
  name: string;
  appliedBy: 'Lead' | 'Partner';
};

export type EquipmentState = {
  selected: string[];
  applied: AppliedEquipment[];
  bagContents: string[];
};

interface ScenarioContextType {
  phase: SimulationPhase;
  setPhase: (phase: SimulationPhase) => void;
  selectedPPE: string[];
  togglePPE: (item: string) => void;
  
  equipmentState: EquipmentState;
  setEquipmentState: React.Dispatch<React.SetStateAction<EquipmentState>>;
  toggleEquipment: (item: string) => void;
  
  completedActions: string[];
  markActionCompleted: (action: string) => void;
  
  vitalsAssessed: VitalsAssessed;
  setVitalsAssessed: React.Dispatch<React.SetStateAction<VitalsAssessed>>;
  
  impressionRevealed: boolean;
  setImpressionRevealed: (revealed: boolean) => void;
  
  cprConfig: CPRConfig | null;
  setCprConfig: (config: CPRConfig | null) => void;
  activeRole: 'Lead' | 'Partner';
  setActiveRole: (role: 'Lead' | 'Partner') => void;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SimulationPhase>('INITIALIZATION');
  const [selectedPPE, setSelectedPPE] = useState<string[]>([]);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  
  const [equipmentState, setEquipmentState] = useState<EquipmentState>({
    selected: [],
    applied: [],
    bagContents: ['Blood Pressure Cuff', 'Pulse Oximeter']
  });

  const [vitalsAssessed, setVitalsAssessed] = useState<VitalsAssessed>({
    heartRate: false,
    bloodPressure: false,
    spo2: false,
    respiration: false
  });

  const [impressionRevealed, setImpressionRevealed] = useState<boolean>(false);
  const [cprConfig, setCprConfig] = useState<CPRConfig | null>(null);
  const [activeRole, setActiveRole] = useState<'Lead' | 'Partner'>('Lead');

  const togglePPE = (item: string) => {
    setSelectedPPE(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleEquipment = (item: string) => {
    setEquipmentState(prev => ({
      ...prev,
      selected: prev.selected.includes(item) 
        ? prev.selected.filter(i => i !== item) 
        : [...prev.selected, item]
    }));
  };

  const markActionCompleted = (action: string) => {
    setCompletedActions(prev => {
      if (!prev.includes(action)) return [...prev, action];
      return prev;
    });
  };

  return (
    <ScenarioContext.Provider value={{
      phase, setPhase,
      selectedPPE, togglePPE,
      equipmentState, setEquipmentState, toggleEquipment,
      completedActions, markActionCompleted,
      vitalsAssessed, setVitalsAssessed,
      impressionRevealed, setImpressionRevealed,
      cprConfig, setCprConfig,
      activeRole, setActiveRole
    }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const context = useContext(ScenarioContext);
  if (context === undefined) {
    throw new Error('useScenario must be used within a ScenarioProvider');
  }
  return context;
}
