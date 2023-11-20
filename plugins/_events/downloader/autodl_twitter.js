exports.run = {
  regex: /http(?:s)?:\/\/(?:www\.|mobile\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
  async: async (m, {
    client,
    body,
    users,
    setting,
    env,
    Func
  }) => {
    try {
      const regex = /http(?:s)?:\/\/(?:www\.|mobile\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
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
          Func.hitstat('twitter', m.sender)
          links.map(async link => {
            let json = await Func.fetchJson(API('alya', '/api/twitter', { url: link }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            json.data.map(async v => {
              client.sendFile(m.chat, v.url, '', '', m)
              await Func.delay(1500)
            })
          })
        }
      }
    } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  limit: true,
  download: true
}