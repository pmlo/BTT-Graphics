const weather = require("weather-js");
const Discord = require("discord.js");
exports.run = (client, message, args) =>{
    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
        let results = args.join(" ").split("/");
        if (err) message.channel.send(err);


        if (result.length === 0) {
            message.channel.send('**Veuillez entrer une location valide.**')
            return;
        }


        var current = result[0].current;
        var location = result[0].location;


        const embed = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Météo pour ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField('Fuseau horaire',`UTC${(location.timezone > 0)?"+"+location.timezone:location.timezone}`, true)
            .addField('Température',`${current.temperature} Degrés`, true)
            .addField('Ressenti', `${current.feelslike} Degrés`, true)
            .addField('Vent',current.winddisplay, true)
            .addField('Humidité', `${current.humidity}%`, true)

        message.channel.send({embed});
    });
};

exports.info = {
    aliases: ["météo", "meteo"],
    description: "Donne la météo d'une région",
    usage: "[ville/région/pays]",
    category: "Fun",
    permissions: "",
    showHelp: true
};