exports.run = {
  usage: ['threads'],
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
      if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.threads.net/t/CuquRVNLQBU/?igshid=NTc4MTIwNjQ2YQ=='), m)
      if (!args[0].match(/(https:\/\/www.threads.net)/gi)) return client.reply(m.chat, global.status.invalid, m)
      client.sendReact(m.chat, '🕒', m.key)
      let old = new Date()
      let json = await Func.fetchJson(API('alya', '/api/threads', { url: args[0] }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      json.data.map(async v => {
        client.sendFile(m.chat, v.url, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
        await Func.delay(1500)
      })
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}