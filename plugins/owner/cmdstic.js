exports.run = {
   usage: ['+cmdstic', '-cmdstic'],
   use: 'text / command',
   category: 'owner',
   async: async (m, {
      client,
      text,
      command
   }) => {
      if (command == '+cmdstic') {
         if (!m.quoted || !/webp/.test(m.quoted.mimetype)) return client.reply(m.chat, Func.texted('bold', `🚩 Balas stiker yang akan digunakan sebagai perintah stiker.`), m)
         if (!text) return client.reply(m.chat, Func.texted('bold', `🚩 Berikan teks atau perintah.`), m)
         let hash = m.quoted.fileSha256.toString().replace(/,/g, '')
         if (typeof global.db.sticker[hash] != 'undefined') return client.reply(m.chat, `${Func.texted('bold', `🚩 Stiker sudah ada di database dengan teks/perintah`)} : ${Func.texted('monospace', global.db.sticker[hash].text)}`, m)
         global.db.sticker[hash] = {
            text: text,
            created: new Date() * 1
         }
         client.reply(m.chat, `${Func.texted('bold', `🚩 Stiker berhasil ditetapkan sebagai teks / perintah`)} : ${Func.texted('monospace', text)}`, m)
      } else if (command == '-cmdstic') {
         if (!m.quoted || !/webp/.test(m.quoted.mimetype)) return client.reply(m.chat, Func.texted('bold', `🚩 Balas stiker yang akan dihapus dari daftar perintah stiker.`), m)
         let hash = m.quoted.fileSha256.toString().replace(/,/g, '')
         if (typeof global.db.sticker[hash] == 'undefined') return client.reply(m.chat, Func.texted('bold', `🚩 Stiker tidak ada di database.`), m)
         delete global.db.sticker[hash]
         client.reply(m.chat, Func.texted('bold', `🚩 Perintah stiker berhasil dihapus.`), m)
      }
   },
   owner: true
}