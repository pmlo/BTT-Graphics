exports.run = (client, message, args) => {
    message.delete();

    message.channel.send("**Roles Menu : Notif** \n Mettez une réaction à ce message pour avoir le rôle lié à la réaction \n \n 📳 ➔ <@&570215476999880754> \n \n 🎁 ➔ <@&564871811993567248> \n\n 💢 ➔ <@&570214608942661633>").then(msg => {
        msg.react("📳");
        msg.react("🎁");
        msg.react('💢');
    });
};

exports.info = {
    aliases: [""],
    description: "Role",
    usage: "!role",
    category: "Utils",
    permissions: null,
    showHelp: true
};