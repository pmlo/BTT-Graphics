const mongoose = require('mongoose');
const Discord = require("discord.js");
const Warn = require('../../models/warn');

exports.run = (client, message, args) =>{
    if(args.length >= 1){
        let target = message.guild.members.get(args[0].replace(/[\\<>@#&!]/g, ""));
        args.shift();
        if(target){
            let reason = args.join(" ");
            message.delete();
            exports.warn(client, message, target, message.member, reason);
        }else{
            message.channel.send(":x: Le membre est introuvable").then((value) => {
                message.delete(10000);
                value.delete(10000);
            });
        }
    }else{
        let help = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle('❌')
            .setDescription(client.config.prefix+'warn [mention] (raison)');
        message.channel.send(help).then((value) => {
            message.delete(5000);
            value.delete(5000);
        });
    }
};


exports.warn = function warn(client, message, target, modo, reason){
    client.connectDatabase(client, mongoose);
    const warn = new Warn({
        userID: target.user.id,
        moderatorID: modo.user.id,
        guildID: message.guild.id,
        date: new Date(),
        reason: (reason)?reason:null
    });
    warn.save().then((result) => {
        message.channel.send(`:warning: ${target} à été averti par ${modo}` + ((reason)?` pour : `+"`"+reason+"`":''));
        let embed = new Discord.RichEmbed()
            .setColor("#ffe500")
            .setTitle(":warning: **Vous avez reçu un avertissement**")
            .setDescription("Les avertissements sont enregistrés et pourront être décisif pour une prise de sanction");
        if(reason) embed.addField("Raison", (reason)?reason:"Aucune");
        embed.addField("Serveur", message.guild.name, true)
            .addField("Modérateur", modo.displayName, true)
            .setTimestamp(new Date());
        target.user.send(embed).catch((error) => {});
        mongoose.connection.close();
    }).catch((error) => {
        message.channel.send(":x: Une erreur s'est produit le membre n'a pas pu être avertie").then((value) => {
            message.delete(10000);
            value.delete(10000);
        });
    });
};

exports.info = {
    aliases: [],
    description: "Avertir un membre",
    usage: "[mention] (raison)",
    category: "Modération",
    permissions: "MANAGE_MESSAGES",
    showHelp: true
};