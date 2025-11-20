import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import Dashboard from './components/Dashboard';
import { DisasterReport, AppState } from './types';
import { analyzeLocationRisks } from './services/geminiService';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [report, setReport] = useState<DisasterReport | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (location: string) => {
    setAppState(AppState.LOADING);
    setError(null);
    setReport(null);

    try {
      const data = await analyzeLocationRisks(location);
      setReport(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred while analyzing the location.");
      setAppState(AppState.ERROR);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      
      <main className="flex-grow">
        {appState === AppState.IDLE && (
          <div className="text-center pt-20 pb-10 px-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Be Prepared, Not Scared.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Advanced AI-powered environmental analysis for your safety. 
              Get real-time risk assessments, air quality data, and customized safety plans for any location on Earth.
            </p>
          </div>
        )}

        <SearchForm onSearch={handleSearch} isLoading={appState === AppState.LOADING} />

        {appState === AppState.ERROR && (
          <div className="max-w-3xl mx-auto mt-8 px-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900">Analysis Failed</h3>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        <Dashboard data={report} />
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} GuardianAI Disaster Management. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;