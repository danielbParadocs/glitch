const discord = require('discord.js')
const config = require('../config.json');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
    let t = `Bot Prefix: \`${config.prefix}\`\nTo run a command, use \`${config.prefix}command\`.\nUse \`${config.prefix}help <command>\` for a more detailed description about a certain command, or use \`${config.prefix}help\` on its own for a list of all commands.\n`;
    var prefix = config.prefix
    if (message.guild) {
        prefix = await db.fetch(`${message.guild.id}.prefix`) ? await db.fetch(`${message.guild.id}.prefix`) : config.prefix;
    } else {
        prefix = config.prefix
    }
    if (!args[0]) {
        const commandNames = Array.from(bot.commands.keys());
      
        // @Copyrighted: Ditto Duck Penguin & Overdone
        var di = bot.commands.map(c => `**${prefix}${c.help.name}** ~ ${c.help.usage} - ${c.help.desc}`);
        var ki = [];
        var j = 0;
        di.forEach((x, i)=>{
          if (!ki[j]) ki[j] = [];
          ki[j].push(x + "\n");
          if (i != 0 && i % 20 == 0) { j++; }
        })
        var embeds = [];
        ki.forEach(x=>{
          embeds.push({embed: { description:(`${t}${x.join("")}`) } 
          //.setFooter(`Add Bot > https://donebot.tk `))
          });
        })
        var l = 0;
        var msg = await message.channel.send(embeds[l]);
        await msg.react("◀"); 
        await msg.react("▶");
        var b = msg.createReactionCollector((emoji,user)=>emoji.emoji.name == "▶" && user.id == message.author.id || emoji.emoji.name == "◀" && user.id == message.author.id, {
          time: (1000 * 60 * 5)
        });
        b.on('collect', function(c) {
          if (c.emoji.name == "▶" && l < embeds.length && l >= 0) {
            l += 1;
            msg.edit(embeds[l]);
          } else if (c.emoji.name == "◀" && l < embeds.length && l> 0) {
            l -= 1;
            msg.edit(embeds[l]);
          }
        });
             } else {
        let command = args[0];
        if (bot.commands.has(command)) {
            command = bot.commands.get(command);
            let embed = new discord.RichEmbed()
                .setDescription(`${t}Command Name: \`${command.help.name}\`\nUsage: \`${prefix}${command.help.usage}\`\nCommand Description: \`\`\`\n${command.help.desc}\`\`\``)
                .setColor("0x008775")
                .setFooter(`Add Bot > https://talosbot.tk `)
            message.channel.send(embed);
           message.react('😎');
        }
    }
};

exports.help = {
    name: "help",
    desc: "Display All Commands.",
    usage: "help [command]"
};