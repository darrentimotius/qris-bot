import TelegramBot from 'node-telegram-bot-api';
import qrcode from 'qrcode';
import { config } from './config.js';
import { createQrisDinamis } from './qris.js';


const bot = new TelegramBot(config.token);

export const setWebhook = async () => {
  try {
    await bot.setWebHook(config.webhookUrl);
    console.log(`Webhook berhasil di-set ke: ${config.webhookUrl}`);
  } catch (error) {
    console.error("Gagal set webhook:", error.message);
  }
};

bot.onText(/^[0-9]+$/, async (msg) => {
  const chatId = msg.chat.id;
  const nominal = msg.text;

  console.log(`Memproses nominal ${nominal} untuk chat ID ${chatId}...`);

  try {
    const qrisDinamisString = createQrisDinamis(config.qrisString, nominal);
    const qrBuffer = await qrcode.toBuffer(qrisDinamisString, { margin: 2 });
    const caption = `QRIS Dinamis untuk pembayaran Rp ${nominal}`;
    
    await bot.sendPhoto(chatId, qrBuffer, { caption: caption }, {
        filename: `qris_dinamis_${nominal}.png`
    });
    
  } catch (error) {
    console.error("Error membuat atau mengirim QR:", error.message);
    bot.sendMessage(chatId, "Maaf, terjadi kesalahan saat membuat QR code.");
  }
});

bot.on('message', (msg) => {
  if (!/^[0-9]+$/.test(msg.text)) {
    bot.sendMessage(msg.chat.id, "Kirimkan nominal harga (contoh: 10000)");
  }
});

export default bot;