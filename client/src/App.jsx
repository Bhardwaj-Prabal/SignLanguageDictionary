import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AddWordPage from './pages/AddWordPage';
import EditWordPage from './pages/EditWordPage';
import './App.css';

function App() {
  return (
   
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<AddWordPage />} />
              <Route path="/edit/:id" element={<EditWordPage />} />
            </Routes>
          </main>
        </div>
      </Router>
   
  );
}

export default App;