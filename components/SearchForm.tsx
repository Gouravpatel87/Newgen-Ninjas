import React, { useState } from 'react';
// Temporary replacement for lucide-react icons
const Search = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"></circle>
    <path d="M21 21l-4.35-4.35"></path>
  </svg>
);

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const Loader2 = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
  </svg>
);

interface SearchFormProps {
  onSearch: (location: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleGeoLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Ideally we'd reverse geocode here, but for simplicity we pass coordinates string
          // Gemini is smart enough to understand "lat, long" usually, or we can say "Current Location (Lat, Long)"
          const loc = `${position.coords.latitude}, ${position.coords.longitude}`;
          onSearch(loc);
        },
        (error) => {
          console.error("Geolocation error", error);
          alert("Unable to retrieve location. Please enter manually.");
        }
      );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-16 py-4 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
          placeholder="Enter city, state, or region to analyze risk..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button
            type="button"
            onClick={handleGeoLocation}
            disabled={isLoading}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Use my location"
          >
            <MapPin className="h-5 w-5" />
          </button>
        </div>
      </form>
      
      {isLoading && (
        <div className="mt-4 text-center flex items-center justify-center space-x-2 text-blue-600">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-medium">Analyzing environmental data satellite feeds...</span>
        </div>
      )}
    </div>
  );
};

export default SearchForm;