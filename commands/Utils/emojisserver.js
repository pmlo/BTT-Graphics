const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
  const emoji = message.guild.emojis;
  if (!emoji.size) return message.channel.send("Le serveur n'as aucun emoji :construction:");
  const embed = new Discord.RichEmbed()
  .addField("Emojis du serveur", emoji.map((e) => e).join(' '));
  message.channel.send({embed});
};

exports.info = {
    aliases: ["ems"],
    description: "Voir les emojis du serveur",
    usage: "",
    category: "Utils",
    permissions: "",
    showHelp: true
};