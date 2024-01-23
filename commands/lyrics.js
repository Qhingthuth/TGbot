const fetch = require("node-fetch");
const { getStreamFromURL } = global.utils;

module.exports.config = {
 name: "lyrics",
 version: "1.0",
 author: "SiAM/WALEX",
 countDown: 50,
 role: 0,
 shortDescription: {
 vi: "Get lyrics of a song",
 en: "Get lyrics of a song",
 },
 longDescription: {
 vi: "Get lyrics of a song",
 en: "Get lyrics of a song",
 },
 category: "music",
 guide: {
 en: "{pn} <song name>\Example:\{pn} after hours",
 },
},
 module.exports.run = async function ({ api, args, message, event }) {
 const songName = args.join(" ");
 if (!songName) {
 message.reply('Please specify the name of the song you want to find lyrics for.');
 return;
 }

 try {
 const res = await fetch(`https://lyrist.vercel.app/api/${encodeURIComponent(songName)}`);
 const data = await res.json();

 if (data.lyrics) {
 const title = data.title;
 const artist = data.artist;
 const lyrics = data.lyrics;
 const image = data.image;

 const Stream = await getStreamFromURL(image);

 const reply = `❏ Title: ${title}\❏ Artist: ${artist}\\❏ Lyrics:\${lyrics}`;

 message.reply({
 body: reply,
 attachment: Stream
 });
 } else {
 message.reply("Lyrics not found for that song.");
 }
 } catch (error) {
 console.error(error);
 message.reply("error");
 }
 }
};
