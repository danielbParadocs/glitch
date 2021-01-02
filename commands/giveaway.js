const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args1) => {
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas les permissions !");

    let args = message.content.split(" ").slice(1);

      let reminderTime = args[0];
      if(!reminderTime) return message.channel.send("**Merci de mettre un temps. Usage: `g!giveaway 15min | Code**");

      let reminder = args.slice(1).join(" ");

      let remindEmbed = new Discord.RichEmbed()
      .setColor('#ffffff')
      .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
      .setDescription(':tada: Giveaway !')
      .addField("Gain mis en jeu :", reminder)
      .addField("Vous avez : " + reminderTime + " pour participer", "** **" )
      .addField('Cliquez sur la réaction 🎉 pour rentrer dans le GiveAway', "** **")
      .setTimestamp();

      message.channel.send(remindEmbed).then(msg => {
      msg.react("🎉").then( r => { 
          
           
       
        
 



   

                
      setTimeout(function(){
        var winners = [];
       // const users = msg.reactions.get("🎉").users;
         const users = [...(msg.reactions.get("🎉").users)];
             //let winner = users[Math.floor(Math.random() * users.length)];
               //let winner = new Discord.GuildMember(users[Math.floor(Math.random() * users.length)]);
                 let [id,winner] = users[Math.floor(Math.random() * users.length)];
winner = message.guild.member(winner);

        let remindEmbed = new Discord.RichEmbed()
        .setColor('#ffffff')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("Gain :", reminder)
         .addField(`Le vainqueur est : ${winner.user.username}`, "** **")

        .setTimestamp()

        message.channel.send(remindEmbed);
      }, ms(reminderTime));

}
    )})}

module.exports.help = {
	name: "gw",
	alias: [
	"gm",
	"GOODMORNING"
	]
}
