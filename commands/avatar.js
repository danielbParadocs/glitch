const discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || message.author;
  let a256 = user.displayAvatarURL.split('?')[0] + '?size=256';
  let avatarEmbed = new discord.RichEmbed()
    .setAuthor(`${user.tag}'s avatar`)
    .setDescription(`Here's a picture of ${user}'s avatar. You can also find their avatar by link at ${user.displayAvatarURL.split('?')[0]}`)
    .setURL(a256)
    .setImage(user.displayAvatarURL);
  message.channel.send(avatarEmbed);
}
exports.help = {
    name: "avatar",
    desc: "Get your own avatar or others",
    usage: "avatar"
}