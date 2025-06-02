// pages/LoginPage.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Make sure this file exists

const LoginPage = () => {
  const { login, loading, error } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleFacebookLogin = async () => {
    try {
      setIsLoggingIn(true);
      await login();
      navigate('/accounts');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="login-container">
        <p>Initializing...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1 className="heading">Facebook Insights</h1>

      {error && (
        <div className="error-box">
          <p>{error}</p>
        </div>
      )}

      <button
        onClick={handleFacebookLogin}
        disabled={isLoggingIn}
        className={`facebook-button ${isLoggingIn ? 'disabled' : ''}`}
      >
        {isLoggingIn ? 'Connecting...' : 'Connect with Facebook'}
      </button>
    </div>
  );
};

export default LoginPage;
