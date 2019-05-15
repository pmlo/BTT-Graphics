const Discord = require('discord.js');

module.exports = (client) => {

let messageID = "578128357502222346";

let validationID = "__";

let validationRoleID = "553980596821426200";

client.on('raw', async event => {
    if (event.t === 'MESSAGE_REACTION_ADD' || event.t === "MESSAGE_REACTION_REMOVE"){
        let emoji = event.d.emoji.name;
        let channel = client.channels.get(event.d.channel_id);
        let message = channel.fetchMessage(event.d.message_id).then(msg => {
            let member = msg.guild.members.get(event.d.user_id);
            if (msg.id === messageID){
                switch (emoji) {
                    case validationID:
                        let validationRole = member.guild.roles.get(validationRoleID);
                        addOrRemoveRole(event.t, member, validationRole);
                        break;
                }
            }
        })
    }
});

function addOrRemoveRole(t, member, role) {
    if(t === 'MESSAGE_REACTION_ADD'){
        member.addRole("553980596821426200")
        member.removeRole("572091157555839163");
        member.send("<:__:567793291622350860> Vous avez maintenant accès au serveur !")
    }
}

};
