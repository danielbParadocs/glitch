

module.exports.run = (bot, message, args, discord) => {
  let mid = args.join(' ');
  if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) return message.channel.send("You don't have permission to use this command.");
    bot.fetchUser(mid).then(id => {
      message.guild.ban(id).catch(err => {
        message.channel.send("Failed to ban user "+id)
        console.log(err)
      })
      message.channel.send(`Alright ${id} Was HackBanned From This Server.`)
    }).catch(() => {
      message.channel.send(`I Can Not Find A User With This ID ${mid}, Please Try Again`)
    })
}

exports.help = {
    name: "hackban",
    desc: "Ban User From Your Server Before Even He Join To It",
    usage: "!hackban [user]"
};