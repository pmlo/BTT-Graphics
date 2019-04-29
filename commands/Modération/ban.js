const Discord = require("discord.js");

exports.run = (client, message, args) =>{
    if (args.length > 0) {
        let target = message.guild.members.get(args[0].replace(/[\\<>@#&!]/g, ""));
        args.shift();
        if(target) {
            if(target.bannable){
                let reason = (args.length > 0)?args.join(" "):undefined;
                target.ban((reason)? reason:null).then(() => {
                    message.delete();
                    message.channel.send(`:hammer: ${target} à été banni par ${message.member}` + ((reason)?` pour : `+"`"+reason+"`":''));
                }).catch(() => {
                    message.channel.send(":x: Vous n'avez pas la permisson suiffisante de bannir ce membre").then((value) => {
                        message.delete(10000);
                        value.delete(10000);
                    });
                });
            }else{
                message.channel.send(":x: Vous n'avez pas la permisson suiffisante de bannir ce membre").then((value) => {
                    message.delete(10000);
                    value.delete(10000);
                });
            }
        }else{
            message.channel.send(":x: Le membre est introuvable").then((value) => {
                message.delete(10000);
                value.delete(10000);
            });
        }
    } else {
        let help = new Discord.RichEmbed()
            .setColor("#FF0000")
            .setTitle('❌')
            .setDescription(client.config.prefix+'ban [mention] (raison)');
        message.channel.send(help).then((value) => {
            message.delete(10000);
            value.delete(10000);
        });
    }
};

exports.info = {
    aliases: [],
    description: "Bannir un membre",
    usage: "[mention] (raison)",
    category: "Modération",
    permissions: "BAN_MEMBERS",
    showHelp: true
};