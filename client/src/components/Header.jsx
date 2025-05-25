import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white shadow-xl">
      <div className="container mx-auto px-6 py-5 flex justify-between items-center">
        <Link 
          to="/" 
          className="text-3xl font-extrabold tracking-tight hover:text-blue-200 transition-colors duration-300"
        >
          🤟 Sign Language Dictionary
        </Link>
        <nav>
          <Link 
            to="/add" 
            className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            ✨ Add New Word
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;