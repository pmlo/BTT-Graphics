const mongoose = require('mongoose');
const Discord = require("discord.js");
const Warn = require('../../models/warn');
const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

exports.run = (client, message, args) =>{
    if(args.length >= 2){
        let target = message.guild.members.get(args[0].replace(/[\\<>@#&!]/g, ""));
        args.shift();
        if(target){
            client.connectDatabase(client, mongoose);
            if(args[0].toLowerCase() === "all"){
                Warn.remove({
                    userID: target.user.id,
                    guildID: message.guild.id
                }, function (err) {
                    if(err)message.channel.send("Cette fonctionnalité n'est pas encore disponible");
                    message.channel.send("Tous les warns du membre ont été supprimer ✅");
                    mongoose.connection.close();
                });
            }else{
                message.channel.send("Cette fonctionnalité n'est pas encore disponible");
            }

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
            .setDescription(client.config.prefix+'delwarn [mention] [numero/all]');
        message.channel.send(help).then((value) => {
            message.delete(5000);
            value.delete(5000);
        });
    }
};

exports.info = {
    aliases: [],
    description: "Supprimer un avertissement à un membre",
    usage: "[mention] [numero/all]",
    category: "Modération",
    permissions: "MANAGE_MESSAGES",
    showHelp: true
};