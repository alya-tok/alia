exports.run = {
  usage: ['emojimix'],
  hidden: ['mix', 'emomix'],
  use: 'emoji + emoji',
  category: 'converter',
  async: async (m, {
    client,
    text,
    isPrefix,
    command,
    Func
  }) => {
    try {
      let exif = global.db.setting
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, '😳 + 😩'), m)
      let [emo1, emo2] = text.split` + `
      if (!emo1 || !emo2) return client.reply(m.chat, Func.texted('bold', `🚩 Give 2 emoji to mix.`), m)
      client.sendReact(m.chat, '🕒', m.key)
      const json = await Func.fetchJson(API('alya', '/api/emomix', { emo_a: emo1, emo_b: emo2 }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Emoji can't be mixed.`), m)
      await client.sendSticker(m.chat, json.data.url, m, {
        packname: exif.sk_pack,
        author: exif.sk_author,
        categories: [emo1, emo2]
      })
    } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  limit: true,
  cache: true,
  location: __filename
}