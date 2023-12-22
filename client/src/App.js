import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/index';
import SignUp from './components/SignUp/index';
import Login from './components/Login/index';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './components/AuthContext/authContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
