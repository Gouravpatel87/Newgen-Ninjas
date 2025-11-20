export interface AQIData {
  value: number;
  status: string;
  healthImplications: string;
}

export interface DisasterType {
  name: string;
  probability: number; // 0-100
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  description: string;
}

export interface SafeZone {
  name: string;
  description: string;
  type: 'Shelter' | 'High Ground' | 'Medical' | 'Open Space';
}

export interface HistoricalPoint {
  year: string;
  incidentCount: number;
}

export interface DisasterReport {
  location: string;
  timestamp: string;
  aqi: AQIData;
  overallRisk: 'Low' | 'Moderate' | 'High' | 'Critical';
  disasters: DisasterType[];
  safeZones: SafeZone[];
  history: HistoricalPoint[];
  precautions: string[];
}

export enum AppState {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}