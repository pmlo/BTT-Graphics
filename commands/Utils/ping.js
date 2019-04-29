exports.run = (client, message, args) => {
    message.channel.send(":ping_pong: Pong ! (`"+ `${message.createdTimestamp - Date.now()}` + '` ms)');
    bot.channels.get("540107675397128202").send("Log / Utilisateur **" + message.author.username + "** / Commande **Ping**");
};

exports.info = {
    aliases: ["ms"],
    description: "Afficher le ping du bot",
    usage: null,
    category: "Utils",
    permissions: null,
    showHelp: true
};