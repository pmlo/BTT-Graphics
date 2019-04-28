const fs = require("fs");
const path = require("path");
const Enmap = require("enmap");
const db = require('quick.db');
const Discord = require("discord.js");
const bot = new Discord.Client();
let prefix = "!";

bot.config = require("./config.json");
bot.commands = new Enmap();

console.log("Connnection au serveur discord...");
bot.on('ready', async () => {

    fs.readdir(path.join(__dirname, "commands"), (err, files) => {
        if (err) return console.error(err);
        registerCommand(path.join(__dirname, "commands"), files);
    });

    fs.readdirSync(path.join(__dirname, "events")).forEach(function(file) {
        require('./events/' + file)(bot);
    });

    console.log("Le bot est connecter");
});

function registerCommand(pathFile, files) {
    files.forEach(file => {
        if(fs.lstatSync(path.join(pathFile.toLocaleString(), file)).isDirectory()){
            fs.readdir(path.join(pathFile.toLocaleString(), file), (err, files) => {
                registerCommand(path.join(pathFile.toLocaleString(), file), files);
            });
        }else{
            if (!file.endsWith(".js")) return;
            let props = require(`${pathFile}/${file}`);
            let commandName = file.split(".")[0];
            props.command = commandName;
            bot.commands.set(commandName, props);
        }
    });

}

bot.connectDatabase = function connectDatabase(bot, mongoose) {
    mongoose.connect("mongodb://"+bot.config.bdd.user+":"+bot.config.bdd.password+"@"+bot.config.bdd.url+"/"+bot.config.bdd.database, { useNewUrlParser: true }).then();
};

bot.on("ready", () => {
    console.log("Je suis prêt !");
    bot.user.setActivity("Mp For Support !", {type: "STREAMING", url:"https://www.twitch.tv/lafrancedefortnite"});
});

bot.login(process.env.token);

const channelID = "553983747809345576";

bot.on('message', message => {
    if(message.content.startsWith(prefix + "sayembed")) {
        let arg = message.content.split(" ").slice(1);
        let thingToEco = arg.join(" ")
        var embed = new Discord.RichEmbed()
            .setDescription(thingToEco)
        message.channel.sendMessage(embed);
    message.delete();
    }
    if(message.channel.id == channelID && message.content === "Graphics") {
        message.member.addRole("553980596821426200")
        message.member.removeRole("572091157555839163")
        message.author.createDM().then(channel => {
            channel.send('✅ Vous avez maintenant accès au serveur');
    });
        bot.channels.get("572065313668202498").send("✅ " + message.author.username + " Viens d'avoir accès au Serveur");
    message.delete();
    }
});

bot.on("message", async message => {

    if(message.author.bot) return;
  
    if(message.channel.type !== 'text') {
  
      let active = await db.fetch(`support_${message.author.id}`);
  
      let guild = bot.guilds.get('545154825827123211');
  
      let channel, found = true;
  
      try {
        if(active) bot.channels.get(active.channelID).guild;
      }catch(e) {
        found = false;
      }
  
      if(!active || !found) {
  
        active = {};
  
        channel = await guild.createChannel(`${message.author.username}-${message.author.discriminator}`);
  
        channel = await channel.setParent('572086385562091530');
  
        try {
              let lfdfall = guild.roles.find(`name`, "Membres");
              let moderationrole = guild.roles.find(`name`, "❌");
              let respmodorole = guild.roles.find(`name`, "📑| Staff");
  
  
              channel.overwritePermissions(lfdfall, {
              CREATE_INSTANT_INVITE: false,
              KICK_MEMBERS: false,
              BAN_MEMBERS: false,
              ADMINISTRATOR: false,
              MANAGE_CHANNELS: false,
              MANAGE_GUILD: false,
              ADD_REACTIONS: false,
              VIEW_AUDIT_LOG: false,
              VIEW_CHANNEL: false,
              SEND_MESSAGES: false
            });
  
            channel.overwritePermissions(moderationrole, {
            CREATE_INSTANT_INVITE: false,
            KICK_MEMBERS: false,
            BAN_MEMBERS: false,
            ADMINISTRATOR: false,
            MANAGE_CHANNELS: false,
            MANAGE_GUILD: false,
            ADD_REACTIONS: false,
            VIEW_AUDIT_LOG: false,
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false
          });
  
          channel.overwritePermissions(respmodorole, {
          CREATE_INSTANT_INVITE: true,
          KICK_MEMBERS: true,
          BAN_MEMBERS: true,
          ADMINISTRATOR: true,
          MANAGE_CHANNELS: true,
          MANAGE_GUILD: true,
          ADD_REACTIONS: true,
          VIEW_AUDIT_LOG: true,
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true
        });
  
          } catch(e){
            console.log(e.stack);
          }
  
        let author = message.author;
  
        const newChannel = new Discord.RichEmbed()
        .setColor(0x36393e)
        .setAuthor(author.tag)
        .setFooter('Support Ticket Created')
        .addField('User', author)
        .addField('ID', author.id)
  
        await channel.send(newChannel);
  
        author.send(":wave: __**Bonjour/Bonsoir**__ ! \n \n :pushpin: Merci d'avoir contacté le __Support Bot BTT Graphics__ ! Un membre du staff va vous répondre dans les plus brefs délais. \n \n :warning: Avertissement : Si tu envoies des Messages type **Trool**/**Lien**/**Insulte**/**Raciste** ou autres au Bot, tu seras automatiquement __Banni du Serveur__.");
  
        active.channelID = channel.id;
        active.targetID = author.id;
  
      }
  
  
      channel = bot.channels.get(active.channelID);

      const embed = new Discord.RichEmbed()
      .setColor(0x36393e)
      .setAuthor(message.author.tag)
      .setDescription(message.content)
      .setFooter(`Message Recieved -- ${message.author.tag}`)
  
      await channel.send(embed);
  
      db.set(`support_${message.author.id}`, active);
      db.set(`supportChannel_${channel.id}`, message.author.id);
      return;
    }
  
    let support = await db.fetch(`supportChannel_${message.channel.id}`);
  
    if(support) {
  
      support = await db.fetch(`support_${support}`);
  
      let supportUser = bot.users.get(support.targetID);
      if(!supportUser) return message.channel.delete();
  
      if(message.content.toLowerCase() == "?ban") {
  
        message.channel.delete();
  
        db.delete(`support_${support.targetID}`);
        message.guild.member(supportUser).ban("Troll bot / Invite Discord");
        return;
  
      }
  
      if(message.content.toLowerCase() == '?close') {
  
          message.channel.delete();
  
          db.delete(`support_${support.targetID}`);
          bot.users.get(support.targetID).send(`✅ Votre ticket a été fermé, si vous avez d'autres questions, n'hésitez pas`)
          return;
          }
  
      bot.users.get(support.targetID).send(`**${message.member.displayName}** : ${message.content}`)
      message.delete();
  
  
      return message.channel.send(`**${message.member.displayName}** : ${message.content}`);
    }
});

    bot.on('guildMemberAdd', member =>{
    let embed = new Discord.RichEmbed()
        .setColor('#00ff00')
        .setTitle("Un membre à rejoint le discord !")
        .setDescription(`Bienvenue ${member.user} sur le discord de **BTT Graphics** !`)
        .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
    member.guild.channels.get('560909214483087400').send(embed)
    member.addRole("572091157555839163")
    });

    bot.on('guildMemberRemove', member =>{
        let embed = new Discord.RichEmbed()
            .setColor('#ff0000')
            .setTitle("Un membre à quitté le discord !")
            .setDescription(`Aurevoir ${member.user} !`)
            .setFooter('Nous sommes maintenant ' + member.guild.memberCount)
        member.guild.channels.get('560909214483087400').send(embed)   
    });
