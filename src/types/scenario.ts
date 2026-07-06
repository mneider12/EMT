export type SimulationPhase = 'INITIALIZATION' | 'DISPATCH' | 'SCENE_ARRIVAL' | 'PPE_SELECTION' | 'EQUIPMENT_SELECTION' | 'APPROACH_PATIENT' | 'PATIENT_ASSESSMENT' | 'EVALUATION';

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
  'OB kit',
  'AED'
];

export const EQUIPMENT_ACTIONS: Record<string, string> = {
  'O2 bag': 'APPLY_O2_BAG',
  'Trauma bag': 'APPLY_TRAUMA_BAG',
  'Oxygen cylinder': 'APPLY_OXYGEN_CYLINDER',
  'OB kit': 'APPLY_OB_KIT',
  'AED': 'APPLY_AED',
  'Blood Pressure Cuff': 'APPLY_BLOOD_PRESSURE_CUFF',
  'Pulse Oximeter': 'APPLY_PULSE_OXIMETER'
};
