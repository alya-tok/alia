exports.run = {
   usage: ['ocr'],
   hidden: ['copy'],
   use: 'reply photo',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Scraper,
      Func
   }) => {
      try {
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
           	client.sendReact(m.chat, '🕒', m.key)
               let img = await client.downloadMediaMessage(q)
               let js = await Scraper.uploadImage(img)
               let json = await Func.fetchJson(API('alya', '/api/ocr', { image: js.data.url }, 'apikey'))
               if (!json.status) return m.reply(Func.jsonFormat(json))
               client.reply(m.chat, json.data.text, m)
            } else client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk photo.`), m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk photo.`), m)
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk photo.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let img = await q.download()
            let js = await Scraper.uploadImage(img)
            let json = await Func.fetchJson(API('alya', '/api/ocr', { image: js.data.url }, 'apikey'))
            if (!json.status) return m.reply(Func.jsonFormat(json))
            client.reply(m.chat, json.data.text, m)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true,
   premium: true
}