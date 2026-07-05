import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { SimulationPhase } from '../types/scenario';

interface ScenarioContextType {
  phase: SimulationPhase;
  setPhase: (phase: SimulationPhase) => void;
  selectedPPE: string[];
  togglePPE: (item: string) => void;
  selectedEquipment: string[];
  toggleEquipment: (item: string) => void;
  completedActions: string[];
  markActionCompleted: (action: string) => void;
  heartRateMeasured: boolean;
  setHeartRateMeasured: (measured: boolean) => void;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(undefined);

export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SimulationPhase>('INITIALIZATION');
  const [selectedPPE, setSelectedPPE] = useState<string[]>([]);
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([]);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [heartRateMeasured, setHeartRateMeasured] = useState<boolean>(false);

  const togglePPE = (item: string) => {
    setSelectedPPE(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const toggleEquipment = (item: string) => {
    setSelectedEquipment(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
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
      selectedEquipment, toggleEquipment,
      completedActions, markActionCompleted,
      heartRateMeasured, setHeartRateMeasured
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
