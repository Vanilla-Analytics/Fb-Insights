// pages/AccountsPage.jsx
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/AccountsPage.css';

const AccountsPage = () => {
  const { user, accounts, selectedAccount, selectAccount, logout, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleAccountSelect = (account) => {
    selectAccount(account);
    navigate('/dashboard');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (loading) {
    return <div className="accounts-container"><p>Loading accounts...</p></div>;
  }

  if (!user) return null;

  return (
    <div className="accounts-container">
      <div className="accounts-header">
        <div>
          <h1>Select Facebook Account</h1>
          <p>Choose which Facebook page you'd like to manage</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {accounts.length === 0 ? (
        <div className="no-accounts">
          <h3>No Pages Found</h3>
          <p>You don't have any Facebook pages that you manage. Create a Facebook page first to use this tool.</p>
        </div>
      ) : (
        <div className="accounts-grid">
          {accounts.map((account) => (
            <div key={account.id} className="account-card" onClick={() => handleAccountSelect(account)}>
              <div className="account-info">
                {account.picture && <img src={account.picture.data.url} alt={account.name} />}
                <div>
                  <h3>{account.name}</h3>
                  <p>{account.category}</p>
                  <small>Page ID: {account.id}</small>
                </div>
              </div>
              <button className="select-button">Select This Page</button>
            </div>
          ))}
        </div>
      )}

      <div className="info-box">
        <h3>About Account Selection</h3>
        <p>Select the Facebook page you want to analyze. You can switch between different pages later.</p>
      </div>
    </div>
  );
};

export default AccountsPage;
