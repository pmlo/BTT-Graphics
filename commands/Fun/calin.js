const Discord = require("discord.js");

exports.run = (client, message, args) => {

    message.channel.send('`＼(^o^)／`').then(async message => {
        setTimeout(() => {
            message.edit('`d=(´▽｀)=b`');
        }, 1000);
        setTimeout(() => {
            message.edit('`⊂((・▽・))⊃`');
        }, 2000);
        setTimeout(() => {
            message.edit('`⊂( ◜◒◝ )⊃`');
        }, 3000);
        setTimeout(() => {
            message.edit('`⊂（♡⌂♡）⊃`');
        }, 4000);
        setTimeout(() => {
            message.edit('`⊂(◉‿◉)つ`');
        }, 5000);
    });

};

exports.info = {
    aliases: [],
    description: "Je te fais un calin",
    usage: "",
    category: "Fun",
    permissions: "",
    showHelp: true
};