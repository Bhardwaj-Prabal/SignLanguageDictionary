import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search for words or definitions..."
            className="w-full px-6 py-4 pr-14 text-lg rounded-2xl border-2 border-gray-200 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200"
          >
            <MagnifyingGlassIcon className="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;