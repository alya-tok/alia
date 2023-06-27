exports.run = {
   usage: ['toanime'],
   use: 'reply photo',
   category: 'utilities',
   async: async (m, {
      client
   }) => {
      try {
         let old = new Date()
         if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
            let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
            let q = m.quoted ? m.quoted.message[type] : m.msg
            if (/image/.test(type)) {
            client.sendReact(m.chat, '🕒', m.key)
               let img = await client.downloadMediaMessage(q)
               let url = await scrap.uploadImage(img)
               let json = await Func.fetchJson(API('alya', '/api/toanime', { image: url.data.url, style: 'studio_original_painting_comic_triple' }, 'apikey'))
               if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa convert ke anime.`), m)
               client.sendFile(m.chat, json.data.img_urls[0], 'image.jpg', `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
            } else client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
         } else {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let img = await q.download()
            let url = await scrap.uploadImage(img)
            let json = await Func.fetchJson(API('alya', '/api/toanime', { image: url.data.url, style: 'studio_original_painting_comic_triple' }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa convert ke anime.`), m)
            client.sendFile(m.chat, json.data.img_urls[0], 'image.jpg', `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}