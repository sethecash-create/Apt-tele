import React from 'react';
// This line looks for the logo.png you saved in the src folder
import logoImg from './logo.png'; 

const Logo = () => {
  return (
    <div style={styles.container}>
      <img 
        src={logoImg} 
        alt="Aptia 365 Logo" 
        style={styles.logoImage} 
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 0',
  },
  logoImage: {
    height: '40px',     // Adjust this if the logo looks too small or big
    width: 'auto',      // Keeps the logo from looking "squashed"
    display: 'block',
    cursor: 'pointer'
  }
};

export default Logo;