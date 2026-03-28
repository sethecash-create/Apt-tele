import React from 'react';

const Logo = () => {
  return (
    <div style={styles.logoGroup}>
      <div style={styles.topRow}>
        <span style={styles.logoAptia}>Aptia</span>
        <span style={styles.logo365}>365</span>
      </div>
      <div style={styles.logoSub}>CODING SCOOL</div>
    </div>
  );
};

const styles = {
  logoGroup: { 
    textAlign: 'left', 
    lineHeight: '1.1',
    fontFamily: 'Arial, sans-serif'
  },
  topRow: {
    display: 'flex',
    alignItems: 'baseline'
  },
  logoAptia: { 
    fontSize: '24px',
    fontWeight: 'bold', 
    color: '#003344' 
  },
  logo365: { 
    fontSize: '24px',
    fontWeight: 'bold', 
    color: '#00a651' 
  },
  logoSub: { 
    fontSize: '10px', 
    fontWeight: 'bold', 
    letterSpacing: '1px', 
    color: '#003344',
    marginTop: '2px'
  }
};

export default Logo;