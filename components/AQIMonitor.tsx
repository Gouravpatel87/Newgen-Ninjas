import React from 'react';
// Temporary replacement for lucide-react icons
const Wind = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22,4 12,14.01 9,11.01"></polyline>
  </svg>
);
import { AQIData } from '../types';

interface AQIMonitorProps {
  data: AQIData;
}

const AQIMonitor: React.FC<AQIMonitorProps> = ({ data }) => {
  const getColor = (val: number) => {
    if (val <= 50) return 'bg-emerald-500';
    if (val <= 100) return 'bg-yellow-500';
    if (val <= 150) return 'bg-orange-500';
    return 'bg-red-600';
  };

  const getTextColor = (val: number) => {
    if (val <= 50) return 'text-emerald-700';
    if (val <= 100) return 'text-yellow-700';
    if (val <= 150) return 'text-orange-700';
    return 'text-red-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded-md border border-slate-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Live Data</span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Wind className="h-5 w-5 text-blue-500" />
          Air Quality Index
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getTextColor(data.value)} bg-opacity-10 bg-current mr-16`}>
          {data.status}
        </span>
      </div>

      <div className="flex items-end gap-2 mb-2">
        <span className="text-5xl font-bold text-slate-900">{data.value}</span>
        <span className="text-sm text-slate-500 mb-1">US AQI</span>
      </div>

      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
        <div 
          className={`h-full ${getColor(data.value)} transition-all duration-1000`} 
          style={{ width: `${Math.min(data.value, 300) / 3}%` }}
        />
      </div>

      <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg">
        {data.value <= 100 ? (
            <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
        ) : (
            <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
        )}
        <p className="text-sm text-slate-600 leading-relaxed">
          {data.healthImplications}
        </p>
      </div>
    </div>
  );
};

export default AQIMonitor;