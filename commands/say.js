const Discord = require('discord.js')
const fs = require('fs')
const sf = require('snekfetch')

module.exports.run = async (bot, message, args) => {
    let text = args.join(' ');
    let embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(text);
    if (bot.config.owners.includes(message.author.id)) { 
      embed.setAuthor(`Sent by ${message.author.tag}`, message.author.displayAvatarURL);
    };
    message.channel.send(embed);
    message.delete().catch(e => {});
}

exports.help = {
    name: "say",
    desc: "say something",
    usage: "say"
}