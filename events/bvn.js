const Discord = require('discord.js');

module.exports = (client) => {

    client.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle("Un membre à rejoint le discord !")
        .setDescription('Bienvenue ' + member.toString() + " sur le discord de **BTT Graphics** !")
        .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
    member.guild.channels.get('571377026968322058').send(embed)
    member.addRole('571369311231279104')
    });

    client.on('guildMemberRemove', member =>{
        let embed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle("Un membre à quitté le discord !")
            .setDescription("Aurevoir " + member.toString())
            .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
        member.guild.channels.get('571369311231279104').send(embed)
     
    });
};

