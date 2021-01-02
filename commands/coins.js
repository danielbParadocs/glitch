const discord = require('discord.js')
let coins = require("../coins.json");




exports.run = async (bot, message, args) => {
if(!coins[message.author.id]){
  coins[message.author.id] = {
    coins: 0
  };
}

let uCoins = coins[message.author.id].coins;
var user = message.mentions.users.first() || message.author;

let coinEmbed = new discord.RichEmbed()
.setAuthor(`${message.author.username}'s Coins`, message.author.avatarURL)
.setColor(0x36393E)
.setTitle(`You Currently Have <:coins_icon:557137436690612231> ` + uCoins + `<:coins_icon:557137436690612231> Coins`)
.setFooter("Keep Chatting To Get More Levels And More Coins!");

message.channel.send(coinEmbed)

}
exports.help = {
  name: "coins",
  desc: "Get Your Balance Of Coins By Using This Command",
  usage: "coins"
}