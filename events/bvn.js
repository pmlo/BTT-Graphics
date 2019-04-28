const Discord = require('discord.js');

module.exports = (client) => {

    client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle("Un membre à rejoint le discord !")
        .setDescription(`Bienvenue ${member.user} sur le discord de **BTT Graphics** !`)
        .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
    member.guild.channels.get('560909214483087400').send(embed)
    });

    client.on('guildMemberRemove', member =>{
        let embed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle("Un membre à quitté le discord !")
            .setDescription(`Aurevoir ${member.user} !`)
            .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
        member.guild.channels.get('560909214483087400').send(embed)
     
    });
};

