exports.run = {
  usage: ['fb'],
  hidden: ['fbdl', 'fbvid'],
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
      if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://www.facebook.com/reel/555862413147730?mibextid=sgpPy7WDqP7Hc8ec'), m)
      let old = new Date()
      client.sendReact(m.chat, '🕒', m.key)
      const json = await Func.fetchJson(API('alya', '/api/fb', { url: args[0] }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      let result = json.data.find(v => v.quality == 'HD') || json.data.find(v => v.quality == 'SD')
      client.sendFile(m.chat, result.url, Func.filename('mp4'), `◦  *Quality* : ${result.quality}`, m)
    } catch (e) {
      console.log(e)
      return m.reply(Func.jsonFormat(e))
    }
  },
  limit: true,
  cache: true,
  location: __filename
}