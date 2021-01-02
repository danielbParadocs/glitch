const Discord = require('discord.js')









exports.run = async(bot, message, args) => {
  
  
  if(!message.channel.guild) return message.reply('<:not_allowed:557139255839686666> ** This command only for servers**');

     if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("<:not_yet:557275118737424404> **__You Don't Have Permissions__**");
                message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false
  
                }).then(() => {
                    message.reply(`<:true12:557285297856184320> **This Channel Is Closerd Until The User Of !openroom Command**`)
                  
                        });
}
                        
                        
exports.help = {
  name: "closeroom",
  desc: "Close A Room To Make It Locked",
  usage: "closroom"
}