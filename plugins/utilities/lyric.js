exports.run = {
   usage: ['lyric'],
   hidden: ['lirik'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'bad liar'), m)
         if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
         let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:genius\.com\/|(?:genius\.|genius\.)?genius\.com\/(?:com|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
         if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari lirik genius.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/lirikget2', { url: urls[text - 1] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         client.reply(m.chat, json.data.lirik, m)
         } else {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/lirik2', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         if (!json.data.length) return client.reply(m.chat, Func.texted('bold', `🚩 Lirik lagu ${text} tidak ditemukan.`), m)
         let teks = `Untuk menampilkan lirik gunakan perintah ini *${isPrefix}lirik nomor*\n*Example* : ${isPrefix + command} 1\n\n`
         json.data.map((v, i) => {
         if (i < 10) {
         teks += '*' + (i + 1) + '.* ' + v.result.full_title + '\n'
         teks += '	◦  *Link* : ' + v.result.url + '\n\n'
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