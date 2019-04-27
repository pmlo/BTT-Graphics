const Discord = require('discord.js');

const channellID = "571745242923925505";

module.exports = (bot) => {

    bot.on("message", (message) => {
        if (message.channel.id == channellID && message.content.startsWith("!new")) {     
             const reason = message.content.split(" ").slice(1).join(" ");     
             if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`:x: Vous n'avez pas créer de role "Support Team"`);
             if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`:x: Vous avez déjà un billet ouvert.`);    
             message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
                 let role = message.guild.roles.find("name", "Support Team");
                 let role2 = message.guild.roles.find("name", "@everyone");
                 c.overwritePermissions(role, {
                     SEND_MESSAGES: true,
                     READ_MESSAGES: true
                 });    
                 c.overwritePermissions(role2, {
                     SEND_MESSAGES: false,
                     READ_MESSAGES: false
                 });
                 c.overwritePermissions(message.author, {
                     SEND_MESSAGES: true,
                     READ_MESSAGES: true
                 });
                 message.channel.send(`:white_check_mark: ** Votre billet a bien été créé, #${c.name}.**`);
                 const embed = new Discord.RichEmbed()
                     .setColor("#ff0000")
                     .setTitle(`Ticket de ${message.author.username} !`)
                     .addField(`Dans ce channel demande ton graphisme`, `!close pour fermer le Ticket`)
                     .setTimestamp();
                 c.send({
                     embed: embed
                 });
             }).catch(console.error);
         }
      
      
       if (message.content.startsWith("!close")) {
             if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
      
             message.channel.send(`Êtes-vous sûr? Après confirmation, vous ne pouvez pas inverser cette action!\n Pour confirmer, tapez \`!confirm\` Cela entraînera un délai d'attente dans les 10 secondes et l'annulation`)
                 .then((m) => {
                     message.channel.awaitMessages(response => response.content === '!confirm', {
                             max: 1,
                             time: 10000,
                             errors: ['time'],
                         })   
                         .then((collected) => {
                             message.channel.delete();
                         })    
                         .catch(() => {
                             m.edit(":x: La fermeture du ticket a expiré, le ticket n'a pas été fermé.").then(m2 => {
                                 m2.delete();
                             }, 3000);
                         });
                 });
         }
      
     });
};
