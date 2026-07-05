export type SimulationPhase = 'INITIALIZATION' | 'DISPATCH' | 'SCENE_ARRIVAL' | 'PPE_SELECTION' | 'EQUIPMENT_SELECTION' | 'PATIENT_ASSESSMENT';

export const AVAILABLE_PPE = [
  'Nitrile Gloves',
  'Surgical Mask',
  'N95 Mask',
  'Respirator',
  'Face Shield',
  'Safety Glasses',
  'Medical Gown'
];

export const AVAILABLE_EQUIPMENT = [
  'O2 bag',
  'Trauma bag',
  'Oxygen cylinder',
  'OB kit'
];
