const discord = require('discord.js');


module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
.setTitle('<:upvote:560084824321425409> **Thanks For Upvoting To Planet** <:upvote:560084824321425409>')
  .setDescription(`[Upvote For Planet Bot](https://discordbots.org/bot/554326301167845376/vote)`)
  
  message.channel.send(embed)
  
  }
exports.help = {
    name: "vote",
    desc: "Vote For Planet Bot!",
    usage: "vote"
}