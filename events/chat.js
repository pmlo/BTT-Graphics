let spam = {};

let warnBuffer = 4;
let maxBuffer = 8;
let inverval = 2000;
let invervalKick = 4500;
let maxDuplicatesWarning = 3;
let permission = "VIEW_AUDIT_LOG";

module.exports = (client) => {
    client.on('message', async (message) => {
        if(message.channel.type !== "text")return;
        if(message.member.hasPermission(permission) || message.author.bot)return;
        let reason;
        if(checkInvitation(message)) reason = checkInvitation(message);
        if(checkUrl(message)) reason = checkUrl(message);
        if(checkWarnWords(message)) reason = checkWarnWords(message);
        if(checkUpperCase(message)) reason = checkUpperCase(message);
        if(checkMassMention(message)) reason = checkMassMention(message);
        if(checkZalgo(message)) reason = checkZalgo(message);
        if(reason){
            message.delete();
            client.commands.get("warn").warn(client, message, message.member, message.guild.me, reason);
            return true;
        }

        //SPAM
        if(!spam[message.guild.id])spam[message.guild.id] = [];
        if(!spam[message.guild.id][message.author.id]) spam[message.guild.id][message.author.id] = [];
        if(spam[message.guild.id][message.author.id].length > 0 && spam[message.guild.id][message.author.id][0]+inverval < Date.now() && spam[message.guild.id][message.author.id].length < 4) spam[message.guild.id][message.author.id] = [];
        if(spam[message.guild.id][message.author.id].length >= 4 && spam[message.guild.id][message.author.id][0]+invervalKick < Date.now()) spam[message.guild.id][message.author.id] = [];
        spam[message.guild.id][message.author.id].push(Date.now());
        if(spam[message.guild.id][message.author.id].length === 4){
            client.commands.get("warn").warn(client, message, message.member, message.guild.me, "Spam / PROCHAIN WARN = KICK");
        }
        if(spam[message.guild.id][message.author.id].length >= 8){
            client.commands.get("kick").kick(client, message, message.member, message.guild.me, "Spam");
            spam[message.guild.id][message.author.id] = [];
        }
    });
};

function checkInvitation(message) {
    if(message.channel.id === "521040543669682196") return false;
    const words = ['discord.gg/', 'discordapp.com/invite/'];
    let include = false;
    words.forEach((word) => {
        if(message.content.toLowerCase().includes(word)){ include = true;}
    });
    return (include)?"Envoi d'invitation discord":false;
}

function checkUrl(message) {
    const warnWords = ["http://", "https://", "www."];
    if(message.channel.permissionsFor(message.member).has("EMBED_LINKS"))return false;
    let include = false;
    warnWords.forEach((word) => {
        if(message.content.toLowerCase().includes(word)){ include = true;}
    });
    return (include)?"Envoi de lien":false;
}

function checkWarnWords(message) {
    const warnWords = ["tg", "fdp", "connard", "ta gueule", "nazi", "ftg", "ntm", "pute", "salope", "foutre", "baise", " suce ", "hitler", "nique", "enculé", "encule", "enculer", "branle", "couilles", "niquer", "niqué", "enfoirés", "enfoirer", "gay", "homosexuel"];
    let include = false;
    warnWords.forEach((word) => {
        if(message.content.toLowerCase().includes(word)){ include = true;}
    });
    return (include)?"Langage incorrect":false;
}

function checkUpperCase(message) {
    const maxUpperCase = 4;
    let upperI = 0;
    for (let i = 0; i < message.content.length; i++) {
        let chr = message.content.charAt(i);
        if(/[A-Z]|[\u0080-\u024F]/.test(chr) && chr === chr.toUpperCase())upperI++;
        else upperI--;
    }
    return (upperI >= maxUpperCase)?"Message en majuscules":false;
}

function checkMassMention(message) {
    const maxMention = 5;
    let i = 0;
    if(message.mentions.everyone)return (i >= maxMention)?"Mention inutile":false;
    i += message.mentions.members.array().length;
    i += message.mentions.roles.array().length;
    return (i >= maxMention)?"Mention inutile":false;
}

function checkZalgo(message) {
    const regex = new RegExp("[\\u0300–\\u036F\\u1AB0–\\u1AFF\\u1DC0–\\u1DFF\\u20D0–\\u20FF\\uFE20–\\uFE2F\\u0483-\\u0486\\u05C7\\u0610-\\u061A\\u0656-\\u065F\\u0670\\u06D6-\\u06ED\\u0711\\u0730-\\u073F\\u0743-\\u074A\\u0F18-\\u0F19\\u0F35\\u0F37\\u0F72-\\u0F73\\u0F7A-\\u0F81\\u0F84\\u0e00-\\u0eff\\uFC5E-\\uFC62]{2,}");
    return ((regex.test(message.content))?"Utilisation de Zalgo":false);
}