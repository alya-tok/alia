exports.run = {
   usage: ['dongeng'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'hantu'), m)
         if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
         let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:dongengceritarakyat\.com\/|(?:dongengceritarakyat\.|dongengceritarakyat\.)?dongengceritarakyat\.com\/(?:com|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
         if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari dongencng.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/dongengget', { url: urls[text - 1] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let teks = `乂  *D O N G E N G - S E A R C H*\n\n`
            teks += '	◦  *Title* : ' + json.data.title + '\n'
            teks += '	◦  *Author* : ' + json.data.author + '\n'
            teks += '	◦  *Tags* : ' + json.data.tag + '\n'
            teks += '	◦  *Upload* : ' + json.data.date + '\n'
            teks += '	◦  *Model* : ' + json.data.cat + '\n'
            teks += '	◦  *Cerita* : ' + json.data.content + '\n\n'
           /* teks += '	◦  *Views* : ' + json.data.views + '\n'
            teks += '	◦  *Status* : ' + json.data.category + '\n'
            teks += '	◦  *Season* : ' + json.data.season + '\n'
            teks += '	◦  *Studios* : ' + json.data.studio + '\n'
            teks += '	◦  *Sinopsis* : ' + json.data.sinopsis + '\n\n'
            teks += '乂  *D O W N L O A D*\n\n'
            teks += json.file.map(v => `◦ ${v.url} (${v.quality})`).join('\n') + '\n\n' */
            teks += global.footer
            client.sendMessageModify(m.chat, teks, m, {
            title: 'D O N G E N G - S E A R C H',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.thumbnail)
         })
         } else {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/dongeng', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let teks = `Untuk menampilkan detail list dongeng cerita gunakan perintah ini *${isPrefix + command} nomor*\n*Example* : ${isPrefix + command} 1\n\n`
         json.data.map((v, i) => {
         if (i < 10) {
         teks += '*' + (i + 1) + '.* ' + v.title + '\n'
         teks += '	◦  *Link* : ' + v.url + '\n\n'
         }
         })
         teks += global.footer
         client.reply(m.chat, teks, m)
         }
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true
}