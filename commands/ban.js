const discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    if (!message.member.permissions.has("BAN_MEMBERS") && !bot.config.owners.includes(message.author.id) && !message.member.roles.find(c => c.name === "Administrator")) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`<:not_yet:557275118737424404> You do not have permission to use the \`ban\` command. Missing: \`Ban members\` or \`Administrator role\``)
    .setColor("BLUE"));
  

    let member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(m => m.user.username.startsWith(args[0]));
    if (!member) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription('<:not_yet:557275118737424404> Missing More arguments..')
    .addField(`Usage:`, `\`!ban [@user] [reason]\``)
    .setColor("BLUE"));
      
      
      
      
      
      
      
    if (!member.bannable) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription('<:not_yet:557275118737424404> This member cannot be banned. I need my role moved higher than theirs.')
    .setColor("BLUE"));
      
      
      
      
      
      
      
      
      
      
    let reason = args.slice(1).join(' ') || '[No Reason Provided]';
    var embed = new discord.RichEmbed()
.setTitle(`${member.user.tag} You Were Banned`)
        .setColor('RED')
        .setDescription(`Banned by: ${message.author}\nBanned for: \`\`\`\n${reason}\`\`\``)
        .setFooter(`Banned from ${message.guild.name} at`)
        .setTimestamp()
  
    await member.send(embed);
  
    member.ban(reason)
        .catch(error => message.channel.send(`❌ | Sorry ${message.author} I couldn't ban because of: ${error}`));
    var banembed = new discord.RichEmbed()
        .setTitle(`${member.user.tag} Was Banned`)
        .setColor('RED')
        .setDescription(`Banned by: ${message.author}\nBanned for: \`\`\`\n${reason}\`\`\``)
        .setFooter(`Banned from ${message.guild.name} at`)
        .setTimestamp()
    message.channel.send(banembed);
}
exports.help = {
    name: "ban",
    desc: "Ban a member from your server.",
    usage: "ban \`<member>\`"
}