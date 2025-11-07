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

app.get('/register-webhook', async (req, res) => {
  try {
    await setWebhook(); 
    res.status(200).send(`Webhook berhasil di-set ke: ${config.webhookUrl}`);
  } catch (error) {
    console.error("Gagal set webhook:", error.message);
    res.status(500).send(`Gagal set webhook: ${error.message}`);
  }
});

export default app;