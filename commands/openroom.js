const Discord = require('discord.js')









exports.run = async(bot, message, args) => {
  
  
  if(!message.channel.guild) return message.reply('** This command only for servers**');
  
     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('**You Can Not Use This Command Because You Are Missing** ``Manage Channels`` **Permission**');
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: true
  
                }).then(() => {
                    message.reply(":white_check_mark: **This Channel Is __Opened__ !**")
                });
      }


exports.help = {
  name: "openroom",
  desc: "Open A Room To Allow Everyone To Write On It",
  usage: "openroom"
}