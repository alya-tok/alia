exports.run = {
  usage: ['brainly'],
  use: 'query',
  category: 'utilities',
  async: async (m, {
    client,
    text,
    args,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'javascript'), m)
      let json = await Func.fetchJson(API('alya', '/api/brainly', { questions: text }, 'apikey'))
      if (!json.status) return client.reply(m.chat, global.status.fail, m)
      let teks = `乂  *B R A I N L Y*\n\n`
      json.data.map((v, i) => {
        teks += '*' + (i + 1) + '. ' + v.question + '*\n'
        teks += '	◦  *Answer* : ' + v.answers + '\n\n'
      })
      client.sendMessageModify(m.chat, teks + global.footer, m, {
        largeThumb: true,
        thumbnail: await Func.fetchBuffer('https://iili.io/HZBxgGR.jpg')
      })
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  limit: true,
  restrict: true
}