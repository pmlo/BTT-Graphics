const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');

module.exports = (client) => {

    client.on('raw', event => {
        if (event.t == 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){           
            let channel = client.channels.get(event.d.channel_id);
            let message = channel.fetchMessage(event.d.message_id).then(msg=> {
            let user = msg.guild.members.get(event.d.user_id);
            if (user.id == client.user.id) return;
            if (msg.author.id == client.user.id){
                const config = require("../config.json"); 
                let MsgPP = config.message.giveroles;
                if(msg.id == MsgPP) {
                    var memberObj = msg.guild.members.get(user.id);    
                    if(event.d.emoji.name == "📳") {
                        var roleObj = msg.guild.roles.get(config.role.notifannonce);
                        if (event.t === "MESSAGE_REACTION_ADD"){
                            memberObj.addRole(roleObj);
                        } else {
                            memberObj.removeRole(roleObj);
                        }
                    } else if (event.d.emoji.name == "🎁") {
                        var roleObj = msg.guild.roles.get(config.role.notifevents);
                        if (event.t === "MESSAGE_REACTION_ADD"){
                            memberObj.addRole(roleObj);
                        } else {
                            memberObj.removeRole(roleObj);
                        }
                    } else if (event.d.emoji.name == "💢") {
                        var roleObj = msg.guild.roles.get(config.role.notifpub);
                        if (event.t === "MESSAGE_REACTION_ADD"){
                            memberObj.addRole(roleObj);
                        } else {
                            memberObj.removeRole(roleObj);
                        }
                    }
                }
            }
            
            });
        }  
    });
}