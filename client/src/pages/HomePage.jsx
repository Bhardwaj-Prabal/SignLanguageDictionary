// src/pages/HomePage.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import WordCard from '../components/WordCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  // Fetch all words on initial load
  useEffect(() => {
    const fetchWords = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/words');
        setWords(res.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch words');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWords();
  }, []);

  // Search words function
  const searchWords = async (query) => {
    try {
      setLoading(true);
      setSearchQuery(query);
      const res = query 
        ? await axios.get(`http://localhost:5000/api/words/search/${query}`)
        : await axios.get('http://localhost:5000/api/words');
      setWords(res.data);
      setError(null);
    } catch (err) {
      setError('Search failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset search and show all words
  const resetSearch = async () => {
    setSearchQuery('');
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/words');
      setWords(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch words');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const wordList = Array.isArray(words) ? words : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <SearchBar onSearch={searchWords} />
          {searchQuery && (
            <button
              onClick={resetSearch}
              className="ml-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-200"
            >
              Return to All Words
            </button>
          )}
        </div>
        
        {loading ? (
          <LoadingSpinner />
        ) : wordList.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6">🤷‍♀️</div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">
                {searchQuery ? `No results for "${searchQuery}"` : 'No words found'}
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                {searchQuery 
                  ? 'Try a different search term' 
                  : 'Your dictionary is waiting to be filled with amazing sign language words!'}
              </p>
              {!searchQuery && (
                <Link 
                  to="/add"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  🌟 Add Your First Word
                </Link>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-700">
                {searchQuery 
                  ? `Found ${wordList.length} ${wordList.length === 1 ? 'result' : 'results'} for "${searchQuery}"`
                  : `Found ${wordList.length} amazing ${wordList.length === 1 ? 'word' : 'words'}`}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {wordList.map((word) => (
                <WordCard
                  key={word._id}
                  id={word._id}
                  word={word.word}
                  definition={word.definition}
                  imageUrl={word.imageUrl}
                  videoUrl={word.videoUrl}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;