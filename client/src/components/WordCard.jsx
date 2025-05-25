import { Link } from 'react-router-dom';

const WordCard = ({ id, word, definition, imageUrl, videoUrl }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2">
      {/* Header with word and edit button */}
      <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {word}
          </h3>
          <Link
            to={`/edit/${id}`}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
            title="Edit this word"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </Link>
        </div>
        <p className="text-gray-600 leading-relaxed">{definition}</p>
      </div>

      {/* Media content */}
      <div className="p-6 space-y-6">
        {/* Image section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            Image Reference
          </h4>
          <div className="relative overflow-hidden rounded-2xl bg-gray-50 group">
            <img
              src={imageUrl}
              alt={`Sign for ${word}`}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Image+Not+Available';
                e.target.className = 'w-full h-48 object-contain rounded-2xl bg-gray-100 p-4';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Video section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center">
            <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
            Video Reference
          </h4>
          <div className="relative pt-[56.25%] rounded-2xl overflow-hidden bg-gray-900 shadow-inner">
            <iframe
              src={videoUrl}
              title={`Video for ${word}`}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordCard;
