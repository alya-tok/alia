exports.run = {
  usage: ['openai'],
  hidden: ['ai'],
  use: 'question',
  category: 'utilities',
  async: async(m, {
    client,
    text,
    isPrefix,
    command,
    Scraper,
    Func
  }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Cara masak mi'), m)
      client.sendReact(m.chat, '🕒', m.key)
      let json = await Func.fetchJson(API('alya', '/api/openai', { prompt: text }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      client.reply(m.chat, json.data.content, m)
    } catch (e) {
      client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  restrict: true
  }