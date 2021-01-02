const discord = require('discord.js')
const fs = require('fs')
const sf = require('snekfetch')


module.exports.run = async (bot, message, args) => {
 let start = Date.now(); message.channel.send('🏓').then(message => { 
      message.delete()
        let diff = (Date.now() - start); 
        let API = (bot.ping).toFixed(2)
        let embed = new discord.RichEmbed()
        .setTitle(`🏓Pong!`)
        .setColor(`RANDOM`)
        .addField("📶Latency", `${diff}ms`, true)
        .addField("🕹️API", `${API}ms`, true)
        message.channel.send(embed)
return
  });
 


  message.react('<:downloading_2:557150822245466140')
}

exports.help = {
    name: "ping",
    desc: "Get the bot pings",
    usage: "ping"
}