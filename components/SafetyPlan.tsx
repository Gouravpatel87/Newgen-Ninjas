import React from 'react';
// Temporary replacement for lucide-react icons
const ShieldCheck = ({ className, size }: { className?: string; size?: number }) => (
  <svg className={className} width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M9 12l2 2 4-4"></path>
  </svg>
);

const Navigation = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="3,11 22,2 13,21 11,13 3,11"></polygon>
  </svg>
);

const HeartPulse = ({ size }: { size?: number }) => (
  <svg width={size} height={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5"></path>
    <path d="M12 5L8 21l4-7 4 7-4-16"></path>
  </svg>
);

const CheckSquare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="9,11 12,14 22,4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);
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