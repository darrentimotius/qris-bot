import dotenv from 'dotenv';
dotenv.config();

export const config = {
    token: process.env.TELEGRAM_TOKEN,
    qrisString: process.env.QRIS_STRING,
    serverUrl: process.env.RENDER_EXTERNAL_URL,
    port: process.env.PORT || 3000,
    
    webhookPath: `/webhook/${process.env.TELEGRAM_TOKEN}`,
    webhookUrl: `${process.env.RENDER_EXTERNAL_URL}/webhook/${process.env.TELEGRAM_TOKEN}`
};