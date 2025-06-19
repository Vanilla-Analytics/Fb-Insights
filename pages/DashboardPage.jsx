// pages/DashboardPage.jsx
// // pages/DashboardPage.jsx
// import { useEffect } from 'react';
// import { useAuth } from '../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import '../styles/DashboardPage.css';

// const DashboardPage = () => {
//   const { user, selectedAccount, logout } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) navigate('/');
//     else if (!selectedAccount) navigate('/accounts');
//   }, [user, selectedAccount, navigate]);

//   const handleLogout = async () => {
//     await logout();
//     navigate('/');
//   };

//   const handleSwitchAccount = () => navigate('/accounts');

//   if (!user || !selectedAccount) return null;

//   return (
//     <div className="dashboard-container">
//       <header className="dashboard-header">
//         <h1>Dashboard</h1>
//         <div className="header-actions">
//           <button onClick={handleSwitchAccount}>Switch Account</button>
//           <button className="logout" onClick={handleLogout}>Logout</button>
//         </div>
//       </header>

//       <main>
//         <div className="account-summary">
//           {selectedAccount.picture && (
//             <img src={selectedAccount.picture.data.url} alt={selectedAccount.name} />
//           )}
//           <div>
//             <h2>{selectedAccount.name}</h2>
//             <p>{selectedAccount.category}</p>
//             <small>ID: {selectedAccount.id}</small>
//           </div>
//         </div>

//         <div className="token-box">
//           <h3>Authentication Details</h3>
//           <label>User Access Token</label>
//           <code>{user.accessToken}</code>
//           <label>Page Access Token</label>
//           <code>{selectedAccount.access_token}</code>
//         </div>

//         <div className="placeholder">
//           <h3>Ready for Your Analytics</h3>
//           <p>You can now build your insights dashboard here using the tokens above to access Facebook's Graph API.</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;

// pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const { user, selectedAccount, logout } = useAuth();
  const navigate = useNavigate();
  const [loadingAudit, setLoadingAudit] = useState(false);

  useEffect(() => {
    if (!user) navigate('/');
    else if (!selectedAccount) navigate('/accounts');
  }, [user, selectedAccount, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSwitchAccount = () => navigate('/accounts');

  // const fetchAudit = async () => {
     
  //   try {
  //     setLoadingAudit(true);
  //     //const url = `${import.meta.env.VITE_BACKEND_URL}/api/audit`;
  //     const url = "https://fb-insights-backend-production.up.railway.app/api/audit";
  //     console.log("🔗 Calling backend at:", url);  // 🔍 THIS WILL TELL YOU IF URL IS WRONG

  //     const res = await fetch(url, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({

  //         access_token: selectedAccount.access_token,
  //         page_id: selectedAccount.id,
  //       }),
  //     });

  //     const text = await res.text(); // ✅ get raw response
  //     console.log("🔍 Raw response:", text); // ⬅️ will help debug

  //     try {
  //       const data = JSON.parse(text);
  //       if (data.report) alert(data.report);
  //       else if (data.error) alert("Error: " + data.error);
  //       else alert("No audit report returned.");
  //     } catch (jsonErr) {
  //       console.error("❌ JSON parse failed:", jsonErr);
  //       alert("Backend did not return valid JSON.");
  //     }
  //   } catch (err) {
  //     console.error("❌ Audit error:", err);
  //     alert("Failed to connect to backend.");
  //   } finally {

  //     setLoadingAudit(false);
  //   }
  // };
  const fetchAudit = async () => {

    try {
      setLoadingAudit(true);
      const url = "https://fb-insights-backend-production.up.railway.app/api/audit";
      console.log("🔗 Calling backend at:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_access_token: user.accessToken,
          page_access_token: selectedAccount.access_token,
          page_id: selectedAccount.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to generate PDF");

      const blob = await res.blob();
      const urlBlob = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = urlBlob;
      //a.download = "facebook_audit_report.pdf";
      a.download = `facebook_audit_report_${selectedAccount.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(urlBlob);
      console.log('Audit report downloaded successfully!')
    } catch (err) {
      console.error("❌ Audit error:", err);
      alert("Something went wrong while generating the audit.");
    } finally {
      setLoadingAudit(false);
    }
  };


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
          <h3>Authentication Status</h3>
          <p>You're securely connected. Insights are now available.</p>
        </div>

        <div className="audit-section">
          <h3>Generate Audit Report</h3>
          <p></p>
          <button onClick={fetchAudit} disabled={loadingAudit}>
            {loadingAudit ? 'Generating Audit...' : 'Generate Facebook Audit'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
