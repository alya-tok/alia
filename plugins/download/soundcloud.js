exports.run = {
   usage: ['soundcloud'],
   hidden: ['scdl'],
   use: 'query / link',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} :\n\n${isPrefix + command} https://soundcloud.com/cipilatoz/keisya-levronka-tak-ingin-usai`, m)
         if (text.match('soundcloud.com')) {
         if (!text.match('soundcloud.com')) return m.reply(global.status.invalid)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Func.fetchJson(API('alya', '/api/soundclouddl', { url: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let teks = `乂  *S O U N D C L O U D*\n\n`
         teks += '	◦  *Title* : ' + json.data.title + '\n'
         teks += '	◦  *Author* : ' + json.data.author.username + '\n'
         teks += '	◦  *Likes* : ' + json.data.likes + '\n'
         teks += '	◦  *Views* : ' + json.data.playCount + '\n'
         teks += '	◦  *Duration* : ' + json.data.duration + '\n'
         teks += '	◦  *Published* : ' + json.data.publishedAt + '\n\n'
         teks += global.footer
         client.sendMessageModify(m.chat, teks, m, {
         largeThumb: true,
         thumbnail: await Func.fetchBuffer(json.data.thumbnail) }).then(() => {
         client.sendFile(m.chat, json.data.audio.url, json.data.audio.filename, '', m, {
         document: true
         })
         })
         } else if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?soundcloud(?:com)?\.(?:com|be)(?:\/com\?v=|\/)([^\s&]+)/, 'gi'))
        if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari soundcloud.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Func.fetchJson(API('alya', '/api/soundclouddl', { url: urls[text - 1] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let teks = `乂  *S O U N D C L O U D*\n\n`
         teks += '	◦  *Title* : ' + json.data.title + '\n'
         teks += '	◦  *Author* : ' + json.data.author.username + '\n'
         teks += '	◦  *Likes* : ' + json.data.likes + '\n'
         teks += '	◦  *Views* : ' + json.data.playCount + '\n'
         teks += '	◦  *Duration* : ' + json.data.duration + '\n'
         teks += '	◦  *Published* : ' + json.data.publishedAt + '\n\n'
         teks += global.footer
         client.sendMessageModify(m.chat, teks, m, {
         largeThumb: true,
         thumbnail: await Func.fetchBuffer(json.data.thumbnail) }).then(() => {
         client.sendFile(m.chat, json.data.audio.url, json.data.audio.filename, '', m, {
         document: true
         })
         })
         } else {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/soundcloud', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let teks = `Untuk menampilkan soundcloud gunakan perintah ini *${isPrefix}soundcloud nomor*\n*Example* : ${isPrefix + command} 1\n\n`
         json.data.map((v, i) => {
         if (i < 10) {
         teks += '*' + (i + 1) + '.* ' + v.title + '\n'
         teks += '	◦  *Link* : ' + v.url + '\n\n'
         }
         })
         teks += global.footer
         client.reply(m.chat, teks, m)
         }
         } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: false,
   limit: true,
   restrict: true,
   location: __filename
}