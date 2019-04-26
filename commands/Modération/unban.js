    
exports.run = (client, message, args) =>{
    let id = args.join(' ');
    let member = client.fetchUser(id)
    .then(user => {
      message.guild.unban(user.id)
      .then(() => {
        message.channel.send(`:shield: ${user} à été unban par ${message.author}`);
      }).catch(err => {
          message.channel.send(":x: Vous n'avez pas la permisson suiffisante d'unban ce membre").then((value) => {
              message.delete(10000);
              value.delete(10000);
          });
      })
    }).catch(() => message.channel.send(":x: Le membre est introuvable").then((value) => {
            message.delete(10000);
            value.delete(10000);
        }))
  };
  
  exports.info = {
      aliases: [],
      description: "Débannir un membre",
      usage: "[id]",
      category: "Modération",
      permissions: "BAN_MEMBERS",
      showHelp: true
  };