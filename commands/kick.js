const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("KICK_MEMBERS")  && !bot.config.owners.includes(message.author.id) && !message.member.roles.find(c => c.name === "Moderator")) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`<:not_yet:557275118737424404> You do not have permission to use the \`kick\` command. Missing: \`Kick members\` or \`Moderator role\``)
    .setColor("0xff0003"));
  
        
        
        
        
        
        
        
        
        
        
        
        
        
    message.delete().catch(O_o => { });
    let member = message.mentions.members.first();
    if (!member) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription('<:not_yet:557275118737424404> Missing More arguments.')
    .addField(`Usage:`, `\`!kick [@user] [reason]\``)
    .setColor("0xff0003"));
      
      
      
      
      
      
      
      
      
      
      
      
      
      
    if (!member.kickable) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription('<:not_yet:557275118737424404> This member cannot be kicked. I need my role moved higher than theirs.')
    .setColor("0xff0003"));
      
      
      
      
      
      
    let reason = args.slice(1).join(' ');
    if (!reason) reason = "No reason provided";
    member.send(`You were kicked from ${message.guild.name} for: ${reason}`)
    member.kick(reason)
        .catch(error => message.channel.send(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    var banembed = new discord.RichEmbed()
        .setTitle("**User Was Kicked.**")
        .setColor(0xffa500)
        .addField(`${member.user.tag} was kicked.`, `${message.author} was responsible for kicking them.`)
        .addField(`${message.author.tag}'s reason for kicking them was: ${reason}.`, `The server is now at ${message.guild.members.size} members.`)
        .setTimestamp()
    message.channel.send(banembed).then(m => m.delete(5000))
}
exports.help = {
    name: "kick",
    desc: "Kick From Your Server",
    usage: "kick \`[@User]\`"
}