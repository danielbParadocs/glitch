var figlet = require('figlet');
const Discord = require('discord.js');

module.exports.run = (client, message, args, tools) => {
    if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Warning :warning:', 'You cannot use ascii in private messages.')
  return message.author.sendEmbed(ozelmesajuyari); }
  
  var maxLen = 100 // Kendiniz en yüksek harf sayısını ayarlayabilirsiniz
  
  if(args.join(' ').length > maxLen) return message.channel.send(`En fazla ${maxLen} karakter yazabilirsin!`) 
  
  if(!args[0]) return message.channel.send('Please enter a text ...');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('Bir hata var...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ascii',
  description: '',
  usage: 'ascii'
};