exports.run = {
   usage: ['tiktok', 'tikmp3', 'tikwm'],
   hidden: ['tt'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vt.tiktok.com/ZS8HNgJY9/'), m)
         if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Func.fetchJson(API('alya', '/api/tiktok', { url: Func.ttFixed(args[0]) }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         if (command == 'tiktok' || command == 'tt') {
         let teks = `乂  *T I K T O K*\n\n`
         teks += '	◦  *Author* : ' + json.author.nickname + '\n'
         teks += '	◦  *Views* : ' + json.stats.views + '\n'
         teks += '	◦  *Likes* : ' + json.stats.likes + '\n'
         teks += '	◦  *Dishare* : ' + json.stats.share + '\n'
         teks += '	◦  *Comment* : ' + json.stats.comment + '\n'
         teks += '	◦  *Uploaded* : ' + json.taken_at + '\n'
         teks += '	◦  *Captions* : ' + json.title + '\n\n'
         teks += global.footer
         if (json.durations == 0) {
         let jsons = await Func.fetchJson(API('alya', '/api/ttslide', { url: args[0] }, 'apikey'))
         if (!jsons.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         jsons.data.map(async v => {
         client.sendFile(m.chat, v.url, '', teks, m)
         await Func.delay(1500)
         })
         }
         client.sendFile(m.chat, json.data.video_nowm, '', teks, m)
         } else if (command == 'tikwm') {
         let teks = `乂  *T I K T O K*\n\n`
         teks += '	◦  *Author* : ' + json.author.nickname + '\n'
         teks += '	◦  *Views* : ' + json.stats.views + '\n'
         teks += '	◦  *Likes* : ' + json.stats.likes + '\n'
         teks += '	◦  *Dishare* : ' + json.stats.share + '\n'
         teks += '	◦  *Comment* : ' + json.stats.comment + '\n'
         teks += '	◦  *Uploaded* : ' + json.taken_at + '\n'
         teks += '	◦  *Captions* : ' + json.title + '\n\n'
         teks += global.footer            
         client.sendFile(m.chat, json.data.video_wm, '', teks, m)
         } else if (command == 'tikmp3') {
         return client.sendFile(m.chat, json.data.music, 'audio.mp3', '', m)
         }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}