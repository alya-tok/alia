exports.run = {
   usage: ['movies'],
   hidden: ['film'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'transformers'), m)
         if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
         let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?azm(?:to)?\.(?:to|be)(?:\/to\?v=|\/)([^\s&]+)/, 'gi'))
         if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari film movies.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/filmget', { url: urls[text - 1] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let teks = `乂  *M O V I E S - S E A R C H*\n\n`
            teks += '	◦  *Title* : ' + json.data.title + '\n'
            teks += '	◦  *Genre* : ' + json.data.genres[0] + '\n'
            teks += '	◦  *Upload* : ' + json.data.date + '\n'
            teks += '	◦  *Durasi* : ' + json.data.duration + '\n'
            teks += '	◦  *Rating* : ' + json.data.rating + '\n'
            teks += '	◦  *Status* : ' + json.data.season[1] || json.data.season[0] + '\n'
            teks += '	◦  *Sinopsis* : ' + json.data.sinopsis + '\n\n'
            teks += '乂  *D O W N L O A D*\n\n'
            teks += json.data.server.map(v => `◦ ${v.url} (${v.label})`).join('\n') + '\n\n'
            teks += global.footer
            client.sendMessageModify(m.chat, teks, m, {
            title: 'M O V I E S - S E A R C H',
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.thumbnail)
         })
         } else {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/film', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let teks = `Untuk menampilkan detail list film movie gunakan perintah ini *${isPrefix + command} nomor*\n*Example* : ${isPrefix + command} 1\n\n`
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