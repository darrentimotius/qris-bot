import express from 'express';
import { config } from './config.js';
import bot, { setWebhook } from './bot.js';

const app = express();

app.use(express.json());

app.post(config.webhookPath, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Bot QRIS sedang berjalan!');
});

app.listen(config.port, () => {
  console.log(`Server berjalan di port ${config.port}`);
  
  if (config.token && config.qrisString && config.serverUrl) {
    setWebhook();
  } else {
    console.error('VARIABEL ENVIRONMENT (TOKEN, QRIS_STRING, RENDER_URL) BELUM LENGKAP.');
  }
});