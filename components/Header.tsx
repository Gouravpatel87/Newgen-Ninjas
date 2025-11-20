import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldAlert className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">GuardianAI</h1>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-blue-600 transition-colors">Dashboard</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Global Map</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Resources</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Emergency Contacts</a>
        </nav>
        <div className="md:hidden">
          {/* Mobile menu placeholder */}
        </div>
      </div>
    </header>
  );
};

export default Header;