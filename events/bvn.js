const Discord = require('discord.js');

module.exports = (client) => {
    
    const serverStats = {
        guildID: '545154825827123211',
        totalUsersID: '564862621694820367',
        memberCountID: '564862623921864714',
        botCountID: '564862977698693130'
    }

    client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle("Un membre à rejoint le discord !")
        .setDescription(`Bienvenue ${member.user} sur le discord de **BTT Graphics** !`)
        .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
    member.guild.channels.get('560909214483087400').send(embed)
    member.addRole("572091157555839163")
    client.channels.get(serverStats.totalUsersID).setName(`Membres Total : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Membres Connectés : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Nombre de Bot : ${member.guild.members.filter(m => m.user.bot).size}`);
    });

    client.on('guildMemberRemove', member =>{
        let embed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle("Un membre à quitté le discord !")
            .setDescription(`Aurevoir ${member.user} !`)
            .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
        member.guild.channels.get('560909214483087400').send(embed)
    client.channels.get(serverStats.totalUsersID).setName(`Membres Total : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Membres Connectés : ${member.guild.members.filter(m => !m.user.bot).size}`);
    client.channels.get(serverStats.botCountID).setName(`Nombre de Bot : ${member.guild.members.filter(m => m.user.bot).size}`);
     
    });
};

