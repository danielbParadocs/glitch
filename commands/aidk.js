const Discord = require('discord.js');

module.exports.run = (client, message, args, tools) => {
  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`ماعندك هذا البرمشن[*MANAGE_MESSAGES*] `).catch(console.error);
  message.delete()
  if(!message.channel.guild) return;
  
  const messagecount = parseInt(args.join(' '));
  
  message.channel.fetchMessages({
  
  limit: messagecount
  
  }).then(messages => message.channel.bulkDelete(messages));
  
  
  const embed = new Discord.RichEmbed()
  .setTitle('lol')
  message.channel.sendMessage(embed)
  
    .then(msg => {msg.delete(3000)});
  }
       
    
        
       
  
      module.exports.help = {
	name: "cc",
	alias: "8b"
}

    