const Discord = require('discord.js');

module.exports = (client) => {


let messageID = "558317295131295745";

let pcID = "558318385725702154";
let ps4ID = "558318517170995220";
let xboxID = "558318594954493952";
let twitchID = "558318643897958401";
let notifID = "540921471682478110";

let pcRoleID = "541289050993197057";
let ps4RoleID = "541289052414935070";
let xboxRoleID = "541289053736271873";
let twitchRoleID = "541289054654955538";
let notifRoleID = "541289056340803584";

client.on('raw', async event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === "MESSAGE_REACTION_REMOVE"){
        let emojiId = event.d.emoji.id;
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg => {
            let member = msg.guild.members.get(event.d.user_id);
            if (msg.id === messageID){
                switch (emojiId) {
                    case pcID:
                        let pcRole = member.guild.roles.get(pcRoleID);
                        addOrRemoveRole(event.t, member, pcRole);
                        break;
                    case ps4ID:
                        let ps4Role = member.guild.roles.get(ps4RoleID);
                        addOrRemoveRole(event.t, member, ps4Role);
                        break;
                    case xboxID:
                        let xboxRole = member.guild.roles.get(xboxRoleID);
                        addOrRemoveRole(event.t, member, xboxRole);
                        break;

                    case twitchID:
                        let twitchRole = member.guild.roles.get(twitchRoleID);
                        addOrRemoveRole(event.t, member, twitchRole);
                        break;
                    case notifID:
                        let notifRole = member.guild.roles.get(notifRoleID);
                        addOrRemoveRole(event.t, member, notifRole);
                        break;
                }
            }
        })
    }
});

function addOrRemoveRole(t, member, role) {
    if(t === 'MESSAGE_REACTION_ADD'){
        member.addRole(role);
    }else if(t === 'MESSAGE_REACTION_REMOVE'){
        member.removeRole(role);
    }
}

client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setDescription('Hey ' + member.toString() + + " , bienvenue sur **La France De Fortnite** :tada: :hugging: !\n\n N'oublie pas de choisir t'es grade dans ➔ <#515850558020517898> \n\n Et de mettre dans la Boutique Fortnite notre code Créateur : **LFDF-TOURNOI** :gem:")
        .setFooter('Nous sommes désormais ' + member.guild.memberCount)
    member.guild.channels.get('519294938102366250').send(embed)
    member.addRole('533994115063611402')
    member.addRole('533995952671948811')
    member.addRole('515606140638330890')
    });
};