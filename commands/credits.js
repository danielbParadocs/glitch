const discord = require(`discord.js`)
const fs = require(`fs`)
let profile = JSON.parse(fs.readFileSync("profile.json", "utf8"))



 

module.exports.run = async (bot, message, args) => {
 let men = message.mentions.users.first()
 
  if (message.author.bot) return;
    if (message.author.id === bot.user.id) return;
    if(!message.channel.guild) return;

if(men) {
    if (!profile[men.id]) profile[men.id] = {
    lastDaily:'Not Collected',
    credits: 1,
  };
  }
  if(men) {
message.channel.send(`** ${men.username}, <:credit_icon:557136321169195029> balance` + " is `" + `${profile[men.id].credits}$` + "`.**")
} else {
  message.channel.send(`** ${message.author.username}, your <:credit_icon:557136321169195029> balance` + " is `" + `${profile[message.author.id].credits}$` + "`.**")
}
}

exports.help = {
    name: "bal",
    desc: "Get Your Balance Of Credits",
    usage: "bal"
}
