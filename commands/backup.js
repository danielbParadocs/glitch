let fs = require('fs');
let uuid = require('uuid/v1');
let discord = require('discord.js');
let snek = require('snekfetch');

exports.run = async (bot, message, args) => {
  if (!message.member.permissions.has('ADMINISTRATOR')) return message.channel.send('❌ | You do not have the `ADMINISTRATOR` permission!');
  if (!message.guild.me.permissions.has('ADMINISTRATOR')) return message.channel.send('❌ | I do not have the `ADMINISTRATOR` permission!');
  let {highestRole} = message.guild.me;
  let compare = highestRole.position == message.guild.roles.size-1;
  if (!compare) return message.channel.send('❌ | My role must be at the top!');
  if (!args[0]) {
    return message.channel.send(':x: | Invalid command usage!');
  };
  if (args[0].toLowerCase() == 'create') {
  let m = await message.channel.send('Creating backup...');
  let roles = message.guild.roles.map(r => {
    let {members} = r;
    let mdata = members.map(m => {
      let {id} = m.user;
      let {tag} = m.user;
      let {username} = m.user;
      return {id:id,tag:tag,username:username};
    });
    let {permissions} = r;
    let {mentionable} = r;
    let {position} = r;
    let {color} = r;
    let {name} = r;
    let {id} = r;
    return {members:mdata,permissions:permissions,mentionable:mentionable,position:position,color:color,name:name,id:id};
  });
  let members = message.guild.members.map(m => {
    let {id} = m.user;
    return id;
  });
  let category = message.guild.channels.filter(c => c.type === 'category').map(c => {
    let children = c.children.map(c2 => {
      return {id:c2.id,name:c2.name};
    });
    let {name} = c;
    let {id} = c;
    let {position} = c;
    let {permissionOverwrites} = c;
    let permissions = permissionOverwrites.map(p => {
      let pa = new discord.Permissions(p.allow);
      let pd = new discord.Permissions(p.deny);
      let allowFlags = pa.FLAGS;
      let denyFlags = pd.FLAGS;
      return {id:p.id,type:p.type,deny:p.deny,allow:p.allow};
    });
    return {children:children,name:name,id:id,position:position,permissionOverwrites:permissionOverwrites,permissions:permissions};
  });
  let text = message.guild.channels.filter(c => c.type === 'text').map(c => {
    let {name} = c;
    let {id} = c;
    let {calculatedPosition} = c;
    let parent,parentID,parentName;
    if (c.parent) {
      let {parent} = c;
      let {parentID} = c;
      let parentName = parent.name;
    };
    let {nsfw} = c;
    let {permissionOverwrites} = c;
    let permissions = permissionOverwrites.map(p => {
      let pa = new discord.Permissions(p.allow);
      let pd = new discord.Permissions(p.deny);
      let allowFlags = pa.FLAGS;
      let denyFlags = pd.FLAGS;
      return {id:p.id,type:p.type,deny:p.deny,allow:p.allow};
    });
    let po = JSON.stringify(permissionOverwrites.array());
    return {name:name,id:id,calculatedPosition:calculatedPosition,parentID:parentID,parentName:parentName,nsfw:nsfw,po:po,permissions:permissions};
  });
  let voice = message.guild.channels.filter(c => c.type === 'voice').map(c => {
    let {bitrate,calculatedPosition,name,id,permissionOverwrites} = c;
    let po = JSON.stringify(permissionOverwrites.array());
    let permissions = permissionOverwrites.map(p => {
      let pa = new discord.Permissions(p.allow);
      let pd = new discord.Permissions(p.deny);
      let allowFlags = pa.FLAGS;
      let denyFlags = pd.FLAGS;
      return {id:p.id,type:p.type,deny:p.deny,allow:p.allow};
    });
    let parent,parentID,parentName;
    if (c.parent) {
      let {parent} = c;
      let {parentID} = c;
      let parentName = parent.name;
    };
    return {name:name,id:id,calculatedPosition:calculatedPosition,parentID:parentID,parentName:parentName,permissionOverwrites:permissionOverwrites,permissions:permissions,po:po};
  });
  let data = JSON.stringify({roles:roles,members:members,channels:{category:category,text:text,voice:voice}});
  let id = (new Date().getTime()/16).toString(36);
  fs.writeFile(`/tmp/backup-${id}.data`, data, async (err) => {
    if (err) {
      console.error(err);
      return message.channel.send(':x: | An error occured: ' + err);
    };
    await message.author.send('Your backup is here:',{ file: `/tmp/backup-${id}.data` });
    await m.edit('✅ | Your backup has been created. Check your DMs.');
  });
    return
  };
  if (args[0].toLowerCase() === 'load') {
    let {attachments} = message;
    if (!attachments.first()) {
      return message.channel.send(':x: | You must upload a backup file!');
    };
    let attachment = attachments.first();
    let {url} = attachment;
    let {body} = await snek.get(url);
    let buffer = new Buffer(body);
    if (!buffer) return message.channel.send(':x: | That backup seems to be invalid');
    let data = buffer.toString();
    if (!data) return message.channel.send(':x: | That backup seems to be invalid');
    try {
      data = JSON.parse(data);
    } catch(e) {
      return message.channel.send(':x: | That backup seems to be invalid');
    }
    if (!data) return message.channel.send(':x: | That backup seems to be invalid');
    message.guild.channels.map(c => c.delete().catch(O_o=>{}));
    let category = data.channels.category;
    if (category) {
      category.map(c => {
        c = message.guild.createChannel(c.name,'category');
      });
    };
    let text = data.channels.text;
    if (text) {
      text.map(c => {
        let permissions = c;
        c = message.guild.createChannel(c.name,'text');
        /*permissions.map(p => {
          c.overwritePermissions(c.id);
        });*/
      });
    };
  };
}

module.exports.help = {
    name: "backup",
    desc: "Create/load a server backup.",
    usage: "backup"
}