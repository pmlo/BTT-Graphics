exports.run = (client, message, args) =>{
    if (args.length > 0) {
        let target = message.guild.members.get(args[0].replace(/[\\<>@#&!]/g, ""));
        args.shift();
        if(target) {
            if(target.highestRole.calculatedPosition < message.member.highestRole.calculatedPosition){
                let reason = (args.length > 0)?args.join(" "):undefined;
                let roleMuted = target.guild.roles.find((role) => role.name === "Muted");
                if(roleMuted === undefined){
                    message.channel.send(":x: Le role `Muted` est introuvable sur le serveur").then((value) => {
                        message.delete(10000);
                        value.delete(10000);
                    });
                    return;
                }
                target.addRole(roleMuted , reason).then(() => {
                message.delete();
                message.channel.send(`:hammer: ${target} à été mute par ${message.member}` + ((reason)?` pour : `+"`"+reason+"`":''));
                }).catch(() => {
                message.channel.send(":x: Vous n'avez pas la permisson suiffisante de mute ce membre").then((value) => {
                    message.delete(10000);
                    value.delete(10000);
                });
                });
                }else{
                message.channel.send(":x: Vous n'avez pas la permisson suiffisante de mute ce membre").then((value) => {
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
                    .setDescription(client.config.prefix+'mute [mention] (raison)');
                message.channel.send(help).then((value) => {
                    message.delete(10000);
                    value.delete(10000);
                });
                }
};

exports.info = {
    aliases: [],
    description: "Mute un membre",
    usage: "[mention] (raison)",
    category: "Modération",
    permissions: "KICK_MEMBERS",
    showHelp: true
};