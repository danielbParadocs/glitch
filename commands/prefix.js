  const discord = require('discord.js');
const db = require('quick.db');

module.exports = {
  async run(bot, message, args) {
    const permissions = message.channel.permissionsFor(message.member).has("MANAGE_GUILD");
    if (!permissions) return message.channel.send("This command ain't for you, mate");
    var prefix;
    if (args[0]) {
      prefix = args[0]
    } else {
      message.channel.send("Type The Prefix You Want To Set In Your Next Message");
      var msg = await message.channel.awaitMessages(v=>v.author.id == message.author.id, {
        max:1,
        time:20000,
        errors:['time']
      }).then(x=>{
          prefix = x.array()[0].content
          return prefix;
        });
      if (!msg) return message.channel.send("Prefix set status: Unsuccessful");
    }
    await db.set(`${message.guild.id}.prefix`, prefix)
    message.channel.send(`Prefix set: ${prefix}`);
  },
  help: {
    name: "prefix",
    desc: "Set a prefix for your server",
    usage: "prefix \`<Prefix>\`"
  }
}
