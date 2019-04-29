const Discord = require("discord.js");

exports.run = (client, message, args) =>{
    if (args.length > 0) {
        let target = message.guild.members.get(args[0].replace(/[\\<>@#&!]/g, ""));
        args.shift();
        if(target) {
            if(target.kickable){
                let reason = (args.length > 0)?args.join(" "):undefined;
                exports.kick(client, message, target, message.member, reason);
            }else{
                message.channel.send(":x: Vous n'avez pas la permisson suiffisante d'expulsé ce membre").then((value) => {
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
            .setDescription(client.config.prefix+'kick [mention] (raison)');
        message.channel.send(help).then((value) => {
            message.delete(10000);
            value.delete(10000);
        });
    }
};

exports.kick = function warn(client, message, target, modo, reason){
    let embed = new Discord.RichEmbed()
        .setColor("#ff0705")
        .setTitle(":hammer: **Vous avez été expulsé**");
    if(reason) embed.addField("Raison", (reason)?reason:"Aucune");
    embed.addField("Serveur", message.guild.name, true)
        .addField("Modérateur", modo.displayName, true)
        .setTimestamp(new Date());
    target.user.send(embed);
    target.kick((reason)? reason:null).then(() => {
        message.delete();
        message.channel.send(`:hammer: ${target} à été expulsé par ${modo}` + ((reason)?` pour : `+"`"+reason+"`":''));
    }).catch(() => {
        message.channel.send(":x: Vous n'avez pas la permisson suiffisante d'expulsé ce membre").then((value) => {
            message.delete(10000);
            value.delete(10000);
        });
    });
};

exports.info = {
    aliases: [],
    description: "Expulsé un membre",
    usage: "[mention] (raison)",
    category: "Modération",
    permissions: "KICK_MEMBERS",
    showHelp: true
};