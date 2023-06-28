exports.run = {
   usage: ['ssweb', 'sshp'],
   hidden: ['ss', 'ssphone'],
   use: 'link',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://api.alyachan.my.id'), m)
         if (!Func.isUrl(args[0])) return client.reply(m.chat, Func.texted('bold', '🚩 Masukkan link yang valid untuk di screenshot.'), m)
         client.sendReact(m.chat, '🕒', m.key)
         if (command == 'ss' || command == 'ssweb') {
         let json = await Func.fetchJson(API('alya', '/api/ssweb', { url: args[0] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.data.url, 'image.jpg', '', m)
         } else if (command == 'ssphone' || command == 'sshp') {
         let json = await Func.fetchJson(API('alya', '/api/sshp', { url: args[0] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.data.url, 'image.jpg', '', m)
         }
      } catch (e) {
         console.log(e)
       return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true
}