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
         let caption = `乂  *P I N T E R E S T*\n\n`
         caption += `	◦  *Title* : ${json.title}\n`
         caption += `	◦  *Size* : ${json.data.size}\n`
         caption += `	◦  *Duration* : ${json.duration}\n`
         caption += `	◦  *Quality* : ${json.data.quality}\n\n`
         caption += global.footer
         client.sendFile(m.chat, json.data.url, Func.filename('mp4'), caption, m)
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}