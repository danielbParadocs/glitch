const Discord = require("discord.js");
const fs = require("fs");
let coins = require("../coins.json");
let langue = require('../langue.json')
module.exports.run = async (client, message, args1) => {
    let args = message.content.split(" ").slice(1);



  if(!coins[message.author.id]){
    return message.reply("You are poor")
  }
  if(message.mentions.users.size === 0){
    return message.channel.send("Ping an user")
  }
  if(message.mentions.users.size === 1){
  let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

  if(!coins[pUser.id]){
    coins[pUser.id] = {
      coins: 0
    };
  }

  let pCoins = coins[pUser.id].coins;
  let sCoins = coins[message.author.id].coins;

  if(sCoins < args[1]) return message.reply("No money to do that");
if(args[1] > "0" && args[1] < "500000000" && args[1] !== NaN){

  coins[message.author.id] = {
    coins: sCoins - parseInt(args[1])
  };

  coins[pUser.id] = {
    coins: pCoins + parseInt(args[1])
  };

  message.channel.send(`${message.author} give to ${pUser} ${args[1]} money.`);

  fs.writeFile("./exports.help = coins.json", JSON.stringify(coins), (err) => {
    if(err) console.log(err)
  });
  }else{
  message.reply('No way')}}

}



exports.help = {
  name: "pay",
  desc: "Open A Room To Allow Everyone To Write On It",
  usage: "openroom"
}