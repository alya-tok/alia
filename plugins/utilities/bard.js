exports.run = {
  usage: ['bard'],
  use: 'query',
  category: 'utilities',
  async: async (m, {
    client,
    text,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'apa itu kucing'), m)
      client.sendReact(m.chat, '🕒', m.key)
      const json = await Func.fetchJson(API('alya', '/api/bard-google-ai', { q: text }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      client.reply(m.chat, json.data.chats, m)
    } catch (e) {
      client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}