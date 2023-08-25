exports.run = {
  regex: /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:stories\/)(?:\S+)?$/,
  async: async (m, {
    client,
    body,
    users,
    setting,
    Scraper
  }) => {
    try {
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:stories\/)(?:\S+)?$/;
      const extract = body ? Func.generateLink(body) : null
      if (extract) {
        const links = extract.filter(v => v.match(regex))
        if (links.length != 0) {
          if (users.limit > 0) {
            let limit = 1
            if (users.limit >= limit) {
              users.limit -= limit
            } else return client.reply(m.chat, Func.texted('bold', `🚩 Limit Anda tidak cukup untuk menggunakan fitur ini.`), m)
          }
          client.sendReact(m.chat, '🕒', m.key)
          let old = new Date()
          Func.hitstat('igs', m.sender)
          links.map(async link => {
            let json = await Func.fetchJson(API('alya', '/api/igs', { url: link }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            for (let v of json.data) {
              client.sendFile(m.chat, v.url, ``, `🍟 *Fetching* : ${((new Date - old) * 1)} ms (${i+1})`, m)
              await Func.delay(1500)
            }
          })
        }
      }
    } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  limit: true,
  download: true,
}