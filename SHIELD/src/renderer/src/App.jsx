import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './jsx/access/login';
import ForgotPassword from './jsx/access/forgotpassword';  
import Signup from './jsx/access/signup'; 
import Verification from './jsx/access/verification'; 
import Navbar from './jsx/elements/navbar'; // Import Navbar
import Footer from './jsx/elements/footer'; // Import Footer
import HomePage from './jsx/pages/homepage'; // Import HomePage
import AboutusPage from './jsx/pages/aboutuspage'; // Import HomePage
import MembersPage from './jsx/pages/memberspage'; // Import HomePage
import FAQPage from './jsx/pages/faqpage'; // Import HomePage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if the user is logged in by looking for a flag in localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const handleLogin = () => {
    // Set the login state and save the login flag in localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  // ProtectedRoute logic applied to all routes
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            {/* Show login page if the user is not logged in */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/" element={<Login setIsLoggedIn={handleLogin} />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verification" element={<Verification />} />
            <Route path="/reset-password" element={<Verification />} />
          </>
        ) : (
          <Route path="*" element={
            <ProtectedRoute>
              <div className='main-container'>
              <Navbar />
              <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/aboutus" element={<AboutusPage />} />
                <Route path="/members" element={<MembersPage />} />
                <Route path="/faq" element={<FAQPage />} />
              </Routes>
              <Footer />
              </div>
            </ProtectedRoute>
          }/>
        )}
      </Routes>
    </Router>
  );
}

export default App;