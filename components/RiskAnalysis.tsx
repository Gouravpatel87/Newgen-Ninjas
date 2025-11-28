import React from 'react';
// Temporary replacement for lucide-react icons
const TriangleAlert = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const Droplets = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path>
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2.04 4.6 4.14 5.98a10.9 10.9 0 0 1 3.83 4.07c-1.33 1.52-3.28 2.43-5.43 2.43-2.15 0-4.1-.91-5.43-2.43a10.9 10.9 0 0 1 1.45-6.47z"></path>
  </svg>
);

const Flame = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
  </svg>
);

const Activity = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"></polyline>
  </svg>
);

const Waves = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
    <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
    <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>
  </svg>
);
import { DisasterType } from '../types';

interface RiskAnalysisProps {
  disasters: DisasterType[];
}

const getIcon = (name: string) => {
  const lower = name.toLowerCase();
  if (lower.includes('flood')) return <Droplets className="h-5 w-5" />;
  if (lower.includes('fire')) return <Flame className="h-5 w-5" />;
  if (lower.includes('quake')) return <Activity className="h-5 w-5" />;
  if (lower.includes('hurricane') || lower.includes('storm')) return <Waves className="h-5 w-5" />;
  return <TriangleAlert className="h-5 w-5" />;
};

const RiskAnalysis: React.FC<RiskAnalysisProps> = ({ disasters }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <TriangleAlert className="h-5 w-5 text-orange-500" />
        Risk Assessment
      </h3>
      <div className="space-y-4">
        {disasters.map((disaster, idx) => (
          <div key={idx} className="group border border-slate-100 rounded-xl p-4 hover:bg-slate-50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${disaster.severity === 'High' || disaster.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  {getIcon(disaster.name)}
                </div>
                <div>
                  <h4 className="font-medium text-slate-900">{disaster.name}</h4>
                  <p className="text-xs text-slate-500">Probability: <span className="font-semibold">{disaster.probability}%</span></p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium border ${
                disaster.severity === 'Critical' ? 'border-red-200 bg-red-50 text-red-700' :
                disaster.severity === 'High' ? 'border-orange-200 bg-orange-50 text-orange-700' :
                'border-blue-200 bg-blue-50 text-blue-700'
              }`}>
                {disaster.severity}
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-2 pl-12">
              {disaster.description}
            </p>
            <div className="mt-3 pl-12 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                    disaster.probability > 70 ? 'bg-red-500' :
                    disaster.probability > 40 ? 'bg-orange-500' : 'bg-blue-500'
                }`} 
                style={{ width: `${disaster.probability}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskAnalysis;