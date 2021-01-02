 const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

        const bans = new Map();
            message.guild.fetchBans().then(g => {
                bans[g.id] = g;
                  let sicon = message.guild.iconURL;
                let banlist = (`${bans[g.id].map(ge => `\n ${ge.tag}`).join('')}`)
                let noembed = new Discord.RichEmbed()
                .setColor(`RANDOM`)
                .setDescription(`No bans on this server.`)
	  .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                if(banlist.length === 0) return message.channel.send(noembed)
                const embed = new Discord.RichEmbed()
                    .setDescription(banlist)
                .setTitle(`Bans for: ${message.guild.name}`)
                .setThumbnail(sicon)
	  .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
                    .setColor(`RANDOM`)
                message.channel.send(embed)
        });
}

exports.help = {
    name: "banlist",
    desc: "Check the bans for this guild.",
    usage: ".bans"
}