const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    }
});

client.on('qr', (qr) => {
    console.log('Scan the QR code below:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ Bot is ready!');
});

client.on('message', async msg => {
    if (msg.body === '!ping') {
        await msg.reply('pong');
    }
});

client.initialize();

// Mini status server
app.get('/', (req, res) => {
    res.send('🤖 Bot de WhatsApp rodando!');
});

app.listen(port, () => {
    console.log(`Servidor web ouvindo na porta ${port}`);
});