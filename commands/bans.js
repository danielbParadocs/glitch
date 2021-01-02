const discord = require('discord.js')
const fs = require('fs')
const sf = require('snekfetch')

module.exports.run = async (bot, message, args) => {
    if(message.channel.type === "dm") return
    message.guild.fetchBans().then(b => {
        let embed = new discord.RichEmbed()
            .setDescription(`There are **${b.size}** bans in \`${message.guild.name}\``)
            .setColor("BLUE")
        message.channel.send(embed)
    })
} 

exports.help = {
    name: "bans",
    desc: "Check the bans for this guild.",
    usage: "bans"
}