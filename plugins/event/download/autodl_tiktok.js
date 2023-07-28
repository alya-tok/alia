exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting,
      prefixes
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.ttFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Limit Anda tidak cukup untuk menggunakan fitur ini.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('tiktok', m.sender)
               links.map(async link => {
               let json = await Func.fetchJson(API('alya', '/api/tiktok', { url: link }, 'apikey'))
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
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
               let jsons = await Func.fetchJson(API('alya', '/api/ttslide', { url: link }, 'apikey'))
               if (!jsons.status) return client.reply(m.chat, Func.jsonFormat(jsons), m)
               jsons.data.map(async v => {
               client.sendFile(m.chat, v.url, '', teks, m)
               await Func.delay(1500)
               })
               }
               client.sendFile(m.chat, json.data.video_nowm, '', teks, m)
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}