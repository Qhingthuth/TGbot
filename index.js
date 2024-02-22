const TeleBot = require('telebot');
const fs = require('fs-extra');
const path = require('path');
const http = require('http');
const logger = require('./logger');
const loader = require('./loader');

// Read bot configuration from config.json
const config = require('./config.json');
const { botToken, adminId, prefix } = config;

const bot = new TeleBot(botToken);

// Load commands dynamically
loader.loadCommands(bot, path.join(__dirname, 'commands'), prefix, adminId, logger);

// Log received messages
bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    const logMessage = Received message | User ID: ${userId} | Group ID: ${chatId} | Message: ${msg.text};
logger(logMessage);
});

// Function to send "Hello, I'm alive!" message
function sendAliveMessage() {
    const chatId = '6446086275'; // Replace with the desired user's chat ID
    bot.sendMessage(chatId, "Hello, I'm alive!");
}

// Send "Hello, I'm alive!" message every hour
setInterval(sendAliveMessage, 60 * 60 * 1000); // Send message every hour

// Start the bot
bot.start();

// Create an HTTP server that responds with a 200 OK status
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running');
});

// Set the server to listen on a port (you can choose any available port)
const PORT = process.env.PORT || 3000; // Use the provided port or default to 3000
server.listen(PORT, () => {
  console.log(Server is listening on port ${PORT});
});

// Keep the bot running
setInterval(() => {
  http.get(http://localhost:${PORT});
}, 5 * 60 * 1000); // Ping the server every 5 minutes
