// src/pages/EditWordPage.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const EditWordPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    word: '',
    definition: '',
    imageUrl: '',
    videoUrl: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/words/${id}`);
        setFormData({
          word: res.data.word,
          definition: res.data.definition,
          imageUrl: res.data.imageUrl,
          videoUrl: res.data.videoUrl
        });
      } catch (err) {
        setError('Failed to load word data');
        console.error(err);
      }
    };

    fetchWord();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.word || !formData.definition || !formData.imageUrl || !formData.videoUrl) {
      setError('All fields are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(`http://localhost:5000/api/words/${id}`, formData);
      navigate('/');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update word';
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('⚠️ Are you sure you want to delete this word? This action cannot be undone.')) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:5000/api/words/${id}`);
        navigate('/');
      } catch (err) {
        const errorMsg = err.response?.data?.message || 'Failed to delete word';
        setError(errorMsg);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* Back to Home Button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 font-semibold hover:bg-blue-50 rounded-lg transition-all duration-200"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            ✏️ Edit Sign Language Word
          </h1>
          <p className="text-gray-600 text-lg">Update your word to keep the dictionary perfect!</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 shadow-sm">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              {error}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl px-8 py-10 border border-gray-200">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="word">
                📝 Word
              </label>
              <input
                id="word"
                name="word"
                type="text"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 text-gray-700"
                value={formData.word}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="definition">
                📖 Definition
              </label>
              <textarea
                id="definition"
                name="definition"
                rows="4"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 text-gray-700 resize-none"
                value={formData.definition}
                onChange={handleChange}
              ></textarea>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="imageUrl">
                🖼️ Image URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 text-gray-700"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-3" htmlFor="videoUrl">
                🎥 Video URL (Embed URL)
              </label>
              <input
                id="videoUrl"
                name="videoUrl"
                type="url"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-400 transition-all duration-300 text-gray-700"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://www.youtube.com/embed/..."
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-full focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 shadow-lg ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-blue-700 hover:scale-105 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? '💫 Updating...' : '✅ Update Word'}
              </button>
              
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-full focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 shadow-lg ${
                  isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:from-red-600 hover:to-pink-700 hover:scale-105 hover:shadow-xl'
                }`}
              >
                {isDeleting ? '🗑️ Deleting...' : '🗑️ Delete Word'}
              </button>
            </div>
            
            <Link
              to="/"
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold hover:bg-gray-100 rounded-full transition-all duration-200"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWordPage;