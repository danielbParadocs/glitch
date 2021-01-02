const discord = require('discord.js')

exports.run = async (bot, message, args) => {




        if(!message.channel.guild) return;
    let embed = new discord.RichEmbed()
    .setAuthor(`${message.author.username}`, message.author.avatarURL)      
    .setTitle(`<:invite_icon:557483839921061898> Click Here To Add ${bot.user.username} <:invite_icon:557483839921061898>`)
    .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=554326301167845376&permissions=8&scope=bot`)
    .setThumbnail("https://cdn.discordapp.com/avatars/554326301167845376/479dba6b65b411cfd01a81193b19ddb2.png")        
 message.channel.sendEmbed(embed);
   }
exports.help = {
    name: "invite",
    desc: "Invite the bot to your server",
    usage: "invite"
}
//invite (needs to be looked at)