exports.run = {
  usage: ['gitclone'],
  use: 'link',
  category: 'downloader',
  async: async (m, {
    client,
    args,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://github.com/alya-tok/alya-bot'), m)
      if (!args[0].match('github.com')) return client.reply(m.chat, global.status.invalid, m)
      client.sendReact(m.chat, '🕒', m.key)
      let old = new Date()
      let json = await Func.fetchJson(API('alya', '/api/gitclone', {
        url: args[0]
      }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      client.sendFile(m.chat, json.data.url, json.data.filename, ``, m)
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}
