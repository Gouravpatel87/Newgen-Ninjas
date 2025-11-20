import React from 'react';
import { TriangleAlert, Droplets, Flame, Activity, Waves } from 'lucide-react';
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