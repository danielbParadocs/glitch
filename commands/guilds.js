const discord = require('discord.js')

module.exports.run = (client, message, args) => {
   const ownerID = '498487070378033177';


    if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");
    let string = '';

    client.guilds.forEach(guild => {
        string += '***Server Name:*** ' + guild.name + '\n' + '***Server ID:***` ' + guild.id + ' ` ' + '\n\n';

    })

    let botembed = new discord.RichEmbed()
        .setColor("#000FF")
        .addField("Bot is On ", string)
        .setTimestamp()
        .setFooter("Command Ran By: " + message.author.username, message.author.avatarURL);
    message.channel.send(botembed);
}
module.exports.help = {
    name: "guilds"
}
