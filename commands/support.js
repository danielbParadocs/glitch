const discord = require('discord.js')





module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#9B59B6")
.addField(":gear: ** Server Support**:gear: ", "**https://discord.gg/WjC5D5P**")
  
  
message.channel.sendEmbed(embed);
 }
 
 
module.exports.help = {
	name: "support",
  desc: "see the support Server",
  usage: "support"
}