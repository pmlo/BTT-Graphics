const Discord = require('discord.js');
let prefix = "!";

module.exports = (client) => {

    client.on('message', message => {
        if(message.content === "!fun") {
            var fun_embed = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle(`:metal: Commande Fun`)
            .addField("**``!sayembed {Texte}``**", "Posté un Embed")
            .addField("**``!smoke``**", "Le Bot Fume")
            .addField("**``!pf``**", "Pile ou Face")
            .addField("**``!calin``**", "Le Bot te fait un Calin")
            .addField("**``!choose [choix 1] [choix 2]``**", "Le Bot choisie entre plusieurs choix")
            .addField("**``!8ball [question]``**", "Pose une Question au Bot")
            .addField("**``!weather [ville]``**", "Voire la Météo de chez toi")
            .setTimestamp()
            message.channel.send(fun_embed);
        }
    });
};