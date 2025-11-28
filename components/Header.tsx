import React from 'react';
// Temporary replacement for ShieldAlert icon
const ShieldAlert = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
);

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