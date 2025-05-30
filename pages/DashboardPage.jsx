// pages/DashboardPage.jsx
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user, selectedAccount, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (!selectedAccount) {
      navigate('/accounts');
    }
  }, [user, selectedAccount, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSwitchAccount = () => {
    navigate('/accounts');
  };

  if (!user || !selectedAccount) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSwitchAccount}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Switch Account
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Current Account Info */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4">
            <div className="flex items-center">
              {selectedAccount.picture && (
                <img
                  src={selectedAccount.picture.data.url}
                  alt={selectedAccount.name}
                  className="h-16 w-16 rounded-full mr-6"
                />
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedAccount.name}
                </h2>
                <p className="text-sm text-gray-500 capitalize">
                  {selectedAccount.category}
                </p>
                <p className="text-xs text-gray-400 font-mono mt-1">
                  ID: {selectedAccount.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Access Token Info (for development/testing) */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Authentication Details
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  User Access Token
                </label>
                <div className="mt-1 bg-gray-50 p-3 rounded-md">
                  <code className="text-xs text-gray-600 break-all">
                    {user.accessToken}
                  </code>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Page Access Token
                </label>
                <div className="mt-1 bg-gray-50 p-3 rounded-md">
                  <code className="text-xs text-gray-600 break-all">
                    {selectedAccount.access_token}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder for your app content */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ready for Your Analytics
            </h3>
            <p className="text-gray-600">
              Your Facebook authentication is complete! You can now build your insights dashboard here.
              Use the access tokens above to make API calls to Facebook's Graph API.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;