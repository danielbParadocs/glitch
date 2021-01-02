const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
       if(message.guild === null)return;

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("**Please Mention A Valid User To Mute.**");
  if(tomute.hasPermission("KICK_MEMBERS")) return message.reply("You Can Not Do This Because You Are Missing Kick_Memebrs Permission**");
  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.reply("**Please Spetify Valid Time To Mute Expl** ``!mute @anoveridiot 1h``");

  await(tomute.addRole(muterole.id));
  message.reply(`<@${tomute.id}> Has Been Muted For ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> Has Been Unmuted`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
	name: "mute",
  desc: "Mute AnOver Idiot On Your Server",
  usage: "!mute \`[@user]\` \`[Duration]\`"
}