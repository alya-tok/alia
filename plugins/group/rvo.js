exports.run = {
   usage: ['rvo'],
   use: 'reply viewonce',
   category: 'group',
   async: async (m, {
      client
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Balas pesan lihat sekali untuk menggunakan perintah ini.`), m)
         if (m.quoted.message) {
            let type = Object.keys(m.quoted.message)[0]
            let q = m.quoted.message[type]
            let media = await client.downloadMediaMessage(q)
            if (/video/.test(type)) {
               return await client.sendFile(m.chat, media, '', q.caption || '', m)
            } else if (/image/.test(type)) {
               return await client.sendFile(m.chat, media, '', q.caption || '', m)
            }
         } else client.reply(m.chat, Func.texted('bold', `Stress ??`), m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true
}