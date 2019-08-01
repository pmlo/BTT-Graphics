const Discord = require("discord.js");
const bot = new Discord.Client();
const db = require('quick.db');
let prefix = "!";

bot.on("ready", () => {
    console.log("Je suis prêt !");
    bot.user.setActivity("Absent | 31/07 ➔ 09/08", {type: "STREAMING", url:"https://www.twitch.tv/lafrancedefortnite"});
});

bot.on("message", async message => {

    if(message.author.bot) return;
  
    if(message.channel.type !== 'text') {
  
      let active = await db.fetch(`support_${message.author.id}`);
  
      try {
        if(active) bot.channels.get(active.channelID).guild;
      }catch(e) {
        found = false;
      }
  
      if(!active || !found) {
  
        active = {};


        let author = message.author;

        author.send("``⚠ Ceci est un message automatique ⚠`` \n\n __Bonjour/Bonsoir__ :wave: \n\n Je suis actuellement __indisponible__ jusqu'au **9 Aout** ! \n\n :arrow_right: Si vous avez un message important à me dire contactez : <@!353187152961732608> ou <@!540597069753221149> \n Ils me feront passé votre message si ils le jugent important, ou y répondront à ma place si ils le peuvent \n\n :arrow_right: Si il n'est pas important, je répondrais à votre Message à mon retour \n\n :arrow_right: Si il est en rapport avec mon serveur ``LFDF | Esport - Community`` , ils sont comme moi Fondateur ils pourront y répondre \n\n __Bonne Journée/Soirée !__");
    }
    }
});

bot.login(process.env.token);
