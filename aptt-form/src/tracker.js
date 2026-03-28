export const trackActivity = async (actionType, extraData = {}) => {
  const student = localStorage.getItem('aptia_user') || "New Visitor";
  const backendUrl = 'http://127.0.0.1:5000/api/track';

  let visitorDetails = {};

  try {
    // 🌐 Fetch Geolocation & IP Data
    const geoRes = await fetch('https://ipapi.co/json/');
    const geo = await geoRes.json();

    // Standard data included in EVERY alert
    visitorDetails = {
      IP: geo.ip || "Unknown",
    };

    // 🕵️‍♂️ Extra "Deep Data" gathered only when landing on the Home Page
    if (actionType.includes("Home Page")) {
      visitorDetails = {
        ...visitorDetails,
        Location: `${geo.city}, ${geo.region}, ${geo.country_name}`,
        Timezone: geo.timezone,
        ISP: geo.org,
        Device: navigator.userAgent,
        Screen: `${window.screen.width}x${window.screen.height}`,
        Language: navigator.language,
        Referrer: document.referrer || "Direct Entry",
        URL: window.location.href,
        Local_Time: new Date().toLocaleString(),
        UTC_Time: new Date().toUTCString()
      };
    }
  } catch (e) {
    visitorDetails = { IP: "Geolocation Blocked" };
  }

  try {
    await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        actionType, 
        student, 
        extraData: { ...visitorDetails, ...extraData } 
      })
    });
  } catch (err) {
    console.log("🚫 Connection Refused: Is the backend running?");
  }
};