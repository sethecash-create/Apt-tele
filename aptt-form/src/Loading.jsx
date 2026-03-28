import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // ⏳ 3-Second Transition to OTP
    const timer = setTimeout(() => {
      navigate('/otp'); 
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.header}>
        <Logo />
        <div style={styles.loginText}>Login</div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.loaderContainer}>
          <div className="spinner-large" style={styles.spinner}></div>
          <h2 style={styles.loadingTitle}>Verifying your information...</h2>
          <p style={styles.loadingSubtitle}>
            Please wait while we establish a secure connection. 
            Do not refresh this page.
          </p>
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
      </footer> {/* Fixed: Changed from </div> to </footer> */}
    </div>
  );
};

const styles = {
  pageWrapper: { width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #ddd' },
  loginText: { color: '#888', fontSize: '22px' },
  mainContent: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' },
  loaderContainer: { textAlign: 'center', maxWidth: '400px' },
  spinner: { width: '60px', height: '60px', margin: '0 auto 25px', border: '6px solid #f3f3f3', borderTop: '6px solid #003344', borderRadius: '50%' },
  loadingTitle: { fontSize: '22px', color: '#333', marginBottom: '10px' },
  loadingSubtitle: { fontSize: '15px', color: '#666', lineHeight: '1.5' },
  footer: { backgroundColor: '#f0f2f5', padding: '40px 10px', textAlign: 'center', fontSize: '12px', color: '#666' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontWeight: 'bold' },
  footerCopyright: { marginBottom: '5px' },
  footerSiteMap: { fontWeight: 'bold' }
};

export default Loading;