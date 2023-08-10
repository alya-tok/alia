exports.run = {
   usage: ['pin'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://pin.it/5fXaAWE'), m)
         if (!args[0].match(/pin(?:terest)?(?:\.it|\.com)/)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Func.fetchJson(API('alya', '/api/pins', { url: args[0] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         json.data.map(v => {
         if (v.type == 'video') return client.sendFile(m.chat, v.url, 'video.mp4', '', m)
         if (v.type == 'image') return client.sendFile(m.chat, v.url, 'image.jpg', '', m)
         })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}