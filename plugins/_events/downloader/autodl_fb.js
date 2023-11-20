exports.run = {
  regex: /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/,
  async: async (m, {
    client,
    body,
    users,
    setting,
    env,
    Func
  }) => {
    try {
      const regex = /^(?:https?:\/\/(web\.|www\.|m\.)?(facebook|fb)\.(com|watch)\S+)?$/;
      const extract = body ? Func.generateLink(body) : null
      if (extract) {
        const links = extract.filter(v => v.match(regex))
        if (links.length != 0) {
          if (users.limit > 0) {
            let limit = 1
            if (users.limit >= limit) {
              users.limit -= limit
            } else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
          }
          client.sendReact(m.chat, '🕒', m.key)
          let old = new Date()
          Func.hitstat('fb', m.sender)
          links.map(async link => {
            let json = await Func.fetchJson(API('alya', '/api/fb', { url: link }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let result = json.data.find(v => v.quality == 'HD' && v.response == 200)
            if (result) {
              client.sendFile(m.chat, result.url, '', '🍟 Quality : HD', m)
            } else {
              let result = json.data.find(v => v.quality == 'SD' && v.response == 200)
              if (!result) return m.reply(status.fail)
              client.sendFile(m.chat, result.url, '', '🍟 Quality : SD', m)
            }
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