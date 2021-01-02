const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let invites = await message.guild.fetchInvites().catch(error => {
        return message.channel.send('I Dont have permission to see the invites');
    });

    invites = invites.array();

    let possibleinvites = [];
    invites.forEach(function(invites) {
        possibleinvites.push(`${invites.inviter.username} |  ${invites.uses} invites`)
    })
  
      let sicon = message.guild.iconURL;
  message.channel.send(
    new Discord.RichEmbed()
    .setColor("RANDOM")
    .setThumbnail(sicon)
    .setTitle(`Leaderboard for ${message.guild.name}`)
    .setDescription(`\`\`\`${possibleinvites.join('\n')}\`\`\``));
}

module.exports.help = {
    name: "leaderboard"
}