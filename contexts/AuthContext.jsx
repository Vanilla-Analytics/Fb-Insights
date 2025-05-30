// contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { facebookSDK } from '../utils/facebook';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      setLoading(true);
      const response = await facebookSDK.getLoginStatus();
      
      if (response.status === 'connected') {
        setUser({
          id: response.authResponse.userID,
          accessToken: response.authResponse.accessToken
        });
        
        // Load user accounts
        await loadUserAccounts(response.authResponse.accessToken);
      }
    } catch (err) {
      console.error('Error checking login status:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await facebookSDK.login();
      
      setUser({
        id: response.authResponse.userID,
        accessToken: response.authResponse.accessToken
      });
      
      // Load user accounts after successful login
      await loadUserAccounts(response.authResponse.accessToken);
      
      return response;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loadUserAccounts = async (accessToken) => {
    try {
      const accountsData = await facebookSDK.getUserAccounts(accessToken);
      setAccounts(accountsData);
    } catch (err) {
      console.error('Error loading accounts:', err);
      setError(err.message);
    }
  };

  const selectAccount = (account) => {
    setSelectedAccount(account);
    // Store selected account in localStorage for persistence
    localStorage.setItem('selectedFacebookAccount', JSON.stringify(account));
  };

  const logout = async () => {
    try {
      setLoading(true);
      await facebookSDK.logout();
      
      // Clear all state
      setUser(null);
      setAccounts([]);
      setSelectedAccount(null);
      setError(null);
      
      // Clear localStorage
      localStorage.removeItem('selectedFacebookAccount');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    accounts,
    selectedAccount,
    loading,
    error,
    login,
    logout,
    selectAccount,
    checkLoginStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};