const fs = require("fs");
const path = require("path");
const Enmap = require("enmap");
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
    bot.user.setActivity('Dev by Stricix', {type: "LISTENING"});
});

bot.login(process.env.token);

bot.on('message', message => {
    if(message.content.startsWith(prefix + "sayembed")) {
        let arg = message.content.split(" ").slice(1);
        let thingToEco = arg.join(" ")
        var embed = new Discord.RichEmbed()
            .setDescription(thingToEco)
        message.channel.sendMessage(embed);
    message.delete();
    }
});
