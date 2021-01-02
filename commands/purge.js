const discord = require('discord.js');

module.exports.run = async (client, msg, args) => {


        //Parse the string argument to a number, and check if it's a number at all (or exceeds the limit)
        let amount = parseInt(args[0])
        if (isNaN(amount) || amount > 100) {
            let embed = new discord.RichEmbed()
            .setDescription('The argument you supplied was not a valid number, or was greater than the limit of 100 messages.')
            return msg.channel.send({ embed: embed })
        }

        //Fetch 100 messages, but only delete the amount + 1 from it (+1 comes from deleting the user's command call too)
        msg.channel.fetchMessages({limit: 100}).then(msgs => {
            let bulk = msgs.array();
            bulk.length = amount + 1;
            bulk = bulk.filter(m => m.deletable && !m.deleted)
            msg.channel.bulkDelete(bulk).catch(e => {
            let embed = new discord.RichEmbed()
            .setDescription('Oops!', `Something went wrong while executing the \`\`${this.name}\`\` command! \n\`\`${e}\`\``)
                return msg.channel.send({ embed: embed })
            });

            let embed = new discord.RichEmbed()
            .setDescription(`:wastebasket: **Succesfully purged ${amount} messages from the chat history.**`, `:white_check_mark: As requested by ${msg.author}`)
            msg.channel.send({ embed: embed })

        })

    }

exports.help = {
  name: "purge",
  desc: "Clear An Amount Of Message",
  usage: "purge [amount]"
}