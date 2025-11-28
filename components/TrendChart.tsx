import React from 'react';
// Temporary replacement for recharts components
const ResponsiveContainer = ({ children, width, height }: { children?: React.ReactNode; width?: string; height?: string }) => <div className="w-full h-full">{children}</div>;
const AreaChart = ({ children, data, margin }: { children?: React.ReactNode; data: any; margin?: any }) => (
  <div className="relative w-full h-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <div className="text-sm text-slate-600 mb-2">Chart Data Points: {data?.length || 0}</div>
      <div className="text-xs text-slate-400">Chart will render when recharts is installed</div>
    </div>
  </div>
);
const Area = () => null;
const XAxis = () => null;
const YAxis = () => null;
const CartesianGrid = () => null;
const Tooltip = () => null;
import { HistoricalPoint } from '../types';
// Temporary replacement for TrendingUp icon
const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
);

interface TrendChartProps {
  data: HistoricalPoint[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-purple-500" />
        Historical Incident Trend
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
                dataKey="year" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#94a3b8', fontSize: 12 }} 
            />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#cbd5e1' }}
            />
            <Area 
                type="monotone" 
                dataKey="incidentCount" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorIncidents)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">
        Simulated historical frequency of major weather events based on regional climate data.
      </p>
    </div>
  );
};

export default TrendChart;