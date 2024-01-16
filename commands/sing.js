// commands/ytplay.js
const axios = require('axios');

module.exports.config = {
    name: "ytplay",
    description: "Search for a music name and get audio and video title",
    usage: "/ytplay <music_name>",
    role: "user", // Allow all users to execute
    usePrefix: true,
    aliases: ["playmusic"],
    author: "Your Name",
};

module.exports.run = async function ({ bot, args, chatId }) {
    // Check if a music name is provided
    const query = args.join(" ");
    if (!query) {
        bot.sendMessage(chatId, "Please provide a music name to search.");
        return;
    }

    // Send a pre-processing message
    const preMessage = await bot.sendMessage(chatId, "Searching for music...");

    try {
        // Fetch music information from the API
        const apiUrl = `https://www.nguyenmanh.name.vn/api/ytplay?query=${encodeURIComponent(query)}&apikey=FSShCQne`;
        const response = await axios.get(apiUrl);

        // Check the API response status
        if (response.status === 200) {
            const result = response.data.result;

            // Send the audio message
            bot.sendVideoNote(chatId, result.audio, {
                caption: `
🎵 Title: ${result.title}
📺 Video Title: ${result.title}
📈 Views: ${result.views}
📅 Upload Date: ${result.uploadDate}
🔗 Channel: ${result.channel}
📖 Description: ${result.desc}
                `,
                parseMode: 'Markdown',
            });
        } else {
            bot.sendMessage(chatId, "An error occurred while searching for music.");
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, "An error occurred while searching for music.");
    } finally {
        // Delete the pre-processing message
        bot.deleteMessage(chatId, preMessage.message_id);
    }
};
