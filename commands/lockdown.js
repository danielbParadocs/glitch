let discord = require('discord.js');
const ms = require('ms');
exports.run = (client, message, args) => {
         if(message.guild === null)return;

               let role = message.member.hasPermission('MANAGE_MESSAGES')
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(
            new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription(`<:not_yet:557275118737424404> You do not have permission to use the \`lockdown\` command. Missing: \`Manage Message Permission\``)
    .setColor("0xff0003"));
  
  
  if (!client.lockit) client.lockit = [];
  let time = args.join(' ');
  let validUnlocks = ['release', 'unlock'];
  if (!time) return message.channel.send(
    new discord.RichEmbed()
    .setTitle(`${message.author.tag}`, message.author.displayAvatarURL)
    .setDescription('<:not_yet:557275118737424404> Missing More arguments.')
    .addField(`Usage:`, `\`!lockdown [duration] ~~~~ Exp: !lockdown 1h\``)
    .setColor("0xff0003"));

  if (validUnlocks.includes(time)) {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    }).then(() => {
      message.channel.sendMessage('Lockdown lifted.');
      clearTimeout(client.lockit[message.channel.id]);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    });
  } else {
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: false
    }).then(() => {
      message.channel.sendMessage(`<:true12:557285297856184320> This Channel Is Locked For ${ms(ms(time), { long:true })}`).then(() => {

        client.lockit[message.channel.id] = setTimeout(() => {
          message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null
          }).then(message.channel.sendMessage('Lockdown lifted.')).catch(console.error);
          delete client.lockit[message.channel.id];
        }, ms(time));

      }).catch(error => {
        console.log(error);
      });
    });
  }
};




exports.help = {
  name: "lockdown",
  desc: "Lock A Channel For A Perioud Of Time",
  usage: "lockdown \`[time]\` ~ Exp !lockdown \`1h\`"
}