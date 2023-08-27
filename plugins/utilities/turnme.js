exports.run = {
  usage: ['turnme'],
  use: 'reply photo',
  category: 'utilities',
  async: async (m, {
    client,
    text,
    Func,
    isPrefix,
    command,
    Scraper
  }) => {
    try {
      let old = new Date()
      if (m.quoted ? m.quoted.message: m.msg.viewOnce) {
        let type = m.quoted ? Object.keys(m.quoted.message)[0]: m.mtype
        let q = m.quoted ? m.quoted.message[type]: m.msg
        if (/image/.test(type)) {
          client.sendReact(m.chat, '🕒', m.key)
          let img = await client.downloadMediaMessage(q)
          let url = await Scraper.uploadImage(img)
          let json = await Func.fetchJson(API('alya', '/api/ai-photo-editors', {
            image: url.data.url, style: 'anime'
          }, 'apikey'))
          if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa convert ke anime.`), m)
          client.sendFile(m.chat, json.data.url, 'image.jpg', `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
        } else client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
      } else {
        let q = m.quoted ? m.quoted: m
        let mime = (q.msg || q).mimetype || ''
        if (!mime) return client.reply(m.chat, Func.texted('bold', `🚩 Reply photo.`), m)
        if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Only for photo.`), m)
        client.sendReact(m.chat, '🕒', m.key)
        let img = await q.download()
        let url = await Scraper.uploadImage(img)
        let json = await Func.fetchJson(API('alya', '/api/ai-photo-editors', {
          image: url.data.url, style: 'anime'
        }, 'apikey'))
        if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa convert ke anime.`), m)
        client.sendFile(m.chat, json.data.url, 'image.jpg', `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
      }
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  limit: true
}
