import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, SignUp, Login, ForgotPassword, ResetPassword, Dashboard, PageNotFound, Footer, NavBar } from './components';
import { AuthProvider } from './components/AuthContext/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resetPasswordToken" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
