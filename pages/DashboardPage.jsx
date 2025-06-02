// pages/DashboardPage.jsx
// pages/DashboardPage.jsx
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const { user, selectedAccount, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
    else if (!selectedAccount) navigate('/accounts');
  }, [user, selectedAccount, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSwitchAccount = () => navigate('/accounts');

  if (!user || !selectedAccount) return null;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-actions">
          <button onClick={handleSwitchAccount}>Switch Account</button>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main>
        <div className="account-summary">
          {selectedAccount.picture && (
            <img src={selectedAccount.picture.data.url} alt={selectedAccount.name} />
          )}
          <div>
            <h2>{selectedAccount.name}</h2>
            <p>{selectedAccount.category}</p>
            <small>ID: {selectedAccount.id}</small>
          </div>
        </div>

        <div className="token-box">
          <h3>Authentication Details</h3>
          <label>User Access Token</label>
          <code>{user.accessToken}</code>
          <label>Page Access Token</label>
          <code>{selectedAccount.access_token}</code>
        </div>

        <div className="placeholder">
          <h3>Ready for Your Analytics</h3>
          <p>You can now build your insights dashboard here using the tokens above to access Facebook's Graph API.</p>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
