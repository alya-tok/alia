exports.run = {
   usage: ['halodoc'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'paru paru'), m)
         if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
         let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?halodoc(?:com)?\.(?:com|be)(?:\/com\?v=|\/)([^\s&]+)/, 'gi'))
         if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari halodoc.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/halodocget', { url: urls[text - 1] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.reply(m.chat, json.data.content, m)
         } else {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/halodoc', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let teks = `Untuk menampilkan detail list halodoc gunakan perintah ini *${isPrefix + command} nomor*\n*Example* : ${isPrefix + command} 1\n\n`
         json.data.map((v, i) => {
         if (i < 10) {
         teks += '*' + (i + 1) + '.* ' + v.title + '\n'
         teks += '	◦  *Link* : ' + v.article + '\n\n'
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