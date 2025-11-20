import React from 'react';
import { ShieldCheck, Navigation, HeartPulse, CheckSquare } from 'lucide-react';
import { SafeZone } from '../types';

interface SafetyPlanProps {
  safeZones: SafeZone[];
  precautions: string[];
}

const SafetyPlan: React.FC<SafetyPlanProps> = ({ safeZones, precautions }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Safe Zones */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
          <Navigation className="h-5 w-5 text-emerald-500" />
          Identified Safe Zones & Resources
        </h3>
        <div className="space-y-4">
          {safeZones.map((zone, idx) => (
            <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition-colors">
              <div className="bg-white p-2 rounded-lg shadow-sm text-emerald-600">
                {zone.type === 'Medical' ? <HeartPulse size={20} /> : <ShieldCheck size={20} />}
              </div>
              <div>
                <h4 className="font-medium text-slate-900">{zone.name}</h4>
                <p className="text-sm text-slate-600 mt-1">{zone.description}</p>
                <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">
                  {zone.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Precautions */}
      <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 text-white">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-400" />
          Critical Safety Precautions
        </h3>
        <ul className="space-y-4">
          {precautions.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckSquare className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500">
                Disclaimer: This plan is AI-generated based on general safety protocols. Always follow local authority instructions during an actual emergency.
            </p>
        </div>
      </div>
    </div>
  );
};

export default SafetyPlan;