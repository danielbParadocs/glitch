const {RichEmbed} = require('discord.js');
const discord = require('discord.js')
const db = require('quick.db');

module.exports.run = async (client,message,args) => {
    const sm = await message.channel.send('pinging...');
    await sm.delete();
    await db.fetch('test12345');
    const sm2 = await message.channel.send('db tested...');
    await sm2.delete();
    const Ban = client.users.get('409351580551479308');
    let bn = await db.fetch('bn');
    if (!bn || bn == null || isNaN(bn)) {
      bn = await db.set('bn',1);
    } else {
      bn = await db.add('bn',1);
    };
  message.channel.send(
    new discord.RichEmbed()
    .setTitle('Info')
    .setDescription(`Here's some information about PlanetBot`)
    .setAuthor(`Bot made by ${Ban.tag}`,Ban.displayAvatarURL)
    .setFooter(client.user.tag,client.user.displayAvatarURL)
    .setColor("RANDOM")
    .addField('Pings',`Client Ping: \`${Math.floor(client.ping*100)/100} ms\`\nMessage Roundtrip: \`${Math.floor(client.ping*100)/100} ms\`\nDatabase Reading: \`${Math.floor((sm2.createdAt-sm.createdAt)*100)/100} ms\`\nBot Uptime: \`${Math.floor(client.uptime/1000)} Seconds\``)    .addField('Development',`Coded By: ${Ban } (${Ban.id})\nCoded Using: \`Node.JS | Discord.JS | Express\`\nBuild Number: \`${(bn*0x0fca3b).toString(16).toUpperCase()}\``)
    .addField('Servers', `I'm serving ${client.guilds.size} servers, with ${client.users.size} users in total.`)
    .addField('Server Stats',`This server has ${message.guild.members.size} members, ${message.guild.roles.size} roles, ${message.guild.channels.size} channels, and ${message.guild.emojis.size} emojis.`)
    .addField('Bot Stats',`I'm using ${Math.floor((process.memoryUsage().heapUsed / 1024 / 1024)*1000)/1000} MB of memory, and I've been up for ${Math.floor(client.uptime/1000)} seconds since my last restart.`)
    .setTimestamp());
};

module.exports.help = {
  name: 'botinfo',
  usage: '',
  desc: 'Displays info about the bot.',
  category: 'fun'
};