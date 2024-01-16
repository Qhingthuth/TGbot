const axios = require('axios');
const BardAI = require('./../lib/bardAI'); // Adjust the path accordingly

module.exports.config = {
    name: "bard",
    description: "Interact with Bard AI",
    usage: "/bard <question>",
    aliases: ["bardai"],
    role: "user", // 0: All users
    usePrefix: true,
    author: "Your Name",
};

module.exports.run = async function ({ bot, args, chatId }) {
    const COOKIE = "fAjiH0odRMJHwuVeeKQEKf6-gckBZIut9WTgmli4wG5TbKAn8mqcL9Ltd3DXUbe5mUdzBA."; // Replace with your actual session cookie
    const bardAI = new BardAI(COOKIE);

    try {
        await bardAI.login();
    } catch (error) {
        console.error(error.message);
        bot.sendMessage(chatId, "⚠️ An error occurred while initializing Bard AI. Please check your session cookie.");
        return;
    }

    const question = args.join(' ');

    if (!question) {
        bot.sendMessage(chatId, "⚠️ Please provide a question.\n💡 Usage: /bard <question>");
        return;
    }

    try {
        const { message, imageUrls } = await bardAI.startBard(question);

        if (message) {
            bot.sendMessage(chatId, message);
        }

        if (imageUrls.length > 0) {
            for (const imageUrl of imageUrls) {
                try {
                    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
                    bot.sendPhoto(chatId, imageBuffer);
                } catch (imageError) {
                    console.error(imageError.message);
                    bot.sendMessage(chatId, `⚠️ An error occurred while fetching and sending the image from URL: ${imageUrl}`);
                }
            }
        }
    } catch (error) {
        console.error(error.message);
        bot.sendMessage(chatId, "⚠️ An error occurred while interacting with Bard AI.");
    }
};
