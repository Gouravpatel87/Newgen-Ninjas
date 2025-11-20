import React from 'react';
import { DisasterReport } from '../types';
import AQIMonitor from './AQIMonitor';
import RiskAnalysis from './RiskAnalysis';
import TrendChart from './TrendChart';
import SafetyPlan from './SafetyPlan';
import { MapPin } from 'lucide-react';

interface DashboardProps {
  data: DisasterReport | null;
}

const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  if (!data) return null;

  const getRiskColor = (risk: string) => {
    switch (risk) {
        case 'Critical': return 'bg-red-500';
        case 'High': return 'bg-orange-500';
        case 'Moderate': return 'bg-yellow-500';
        default: return 'bg-emerald-500';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-700 slide-in-from-bottom-4">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
            <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                {data.location}
                <MapPin className="text-blue-500 h-6 w-6" />
            </h2>
            <p className="text-slate-500 mt-1">Analysis generated on {new Date().toLocaleDateString()}</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
            <span className="text-sm font-medium text-slate-600">Overall Risk Level:</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${getRiskColor(data.overallRisk)}`}>
                {data.overallRisk.toUpperCase()}
            </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <AQIMonitor data={data.aqi} />
        </div>
        <div className="lg:col-span-2">
           <TrendChart data={data.history} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <RiskAnalysis disasters={data.disasters} />
      </div>

      <div className="mb-10">
        <SafetyPlan safeZones={data.safeZones} precautions={data.precautions} />
      </div>
    </div>
  );
};

export default Dashboard;