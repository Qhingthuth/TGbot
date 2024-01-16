// index.js
const express = require("express");
const os = require("os");
const app = express();
const PORT = process.env.PORT || 8080;

const TeleBot = require('telebot');
const fs = require('fs-extra');
const path = require('path');
const logger = require('./logger');
const loader = require('./loader');

const config = require('./config.json');
const { botToken, adminId, prefix } = config;

app.get('/', async(req, res) => {
	res.sendFile(__dirname + '/web.html');
})

const bot = new TeleBot(botToken);

// Load commands dynamically
loader.loadCommands(bot, path.join(__dirname, 'commands'), prefix, adminId, logger);

// Load events dynamically
loader.loadEvents(bot, path.join(__dirname, 'events'));

// Log received messages
bot.on('text', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    const logMessage = `Received message | User ID: ${userId} | Group ID: ${chatId} | Message: ${msg.text}`;
    logger(logMessage);
});

bot.start();

app.listen(PORT, () => {
    // Get the host name of the machine
    const hostName = os.hostname();
    console.log("Bot is running...");
    console.log(`Hosted On: http://${hostName}:${PORT}/`);
  });
  