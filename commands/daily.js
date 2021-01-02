
const discord = require('discord.js')
const fs = require(`fs`)
const moment = require("moment")
let profile = JSON.parse(fs.readFileSync("./profile.json", "utf8"))






exports.run = async (bot, message, args) => {


let men = message.mentions.users.first()
 
  if (message.author.bot) return;
    if (message.author.id === bot.user.id) return;
    if(!message.channel.guild) return;





  if(profile[message.author.id].lastDaily != moment().format('day')) {
    profile[message.author.id].lastDaily = moment().format('day')
    profile[message.author.id].credits += 800
     message.channel.send(`**${message.author.username} you collect your \`800\` :dollar: daily pounds**`)
} else {
    message.channel.send(`**:stopwatch: | ${message.author.username}, your daily :yen: credits refreshes ${moment().endOf('day').fromNow()}**`)
}
  }

exports.help = {
  name: "daily",
  desc: "Get Your Daily Credits On Your Balance",
  usage: "daily"
}