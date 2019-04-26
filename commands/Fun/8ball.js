const Discord = require("discord.js");

exports.run = (client, message, args) => {
     let reason = args.join(' ');
    if (reason.length < 1) return message.channel.send('Tu n\'as pas donné une question au bot');
    var ball = ['C\'est certain.','Aucune chance.','Peut-être, le temps le diras.','Non aucunement.','Essaie encore.', 'Oui', 'Je ne devrais pas te le dire maintenant', 'Les signes disent oui', 'Oui définitivement', 'Je crois que oui', 'Ma source dit oui', 'Ma source dit non', 'Peut-être'];
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .addField("Tu as demandé", reason)
    .addField("Le bot répond :", ball[Math.floor(Math.random () * ball.length)])
    .setThumbnail("http://www.pngmart.com/files/3/8-Ball-Pool-Transparent-PNG.png")
    message.channel.send({embed})
};
   exports.info = {
    aliases: [],
    description: "Pose une question au bot",
    usage: "",
    category: "Fun",
    permissions: "",
    showHelp: true
};