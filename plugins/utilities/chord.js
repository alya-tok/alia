exports.run = {
  usage: ['chord'],
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
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'kemarin'), m)
      if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
        if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?gitagram(?:com)?\.(?:com|be)(?:\/com\?v=|\/)([^\s&]+)/, 'gi'))
        if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari chord.`), m)
        client.sendReact(m.chat, '🕒', m.key)
        let json = await Func.fetchJson(API('alya', '/api/chordget', { url: urls[text - 1] }, 'apikey'))
        if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
        let teks = '	◦  *Title* : ' + json.data.title + '\n'
        teks += '	◦  *Author* : ' + json.data.author + '\n'
        teks += '	◦  *Update* : ' + json.data.date + '\n'
        teks += '	◦  *Descripsi* : ' + json.data.description + '\n'
        teks += '	◦  *Chords* : ' + json.data.chord + '\n'
        client.reply(m.chat, teks, m)
      } else {
        client.sendReact(m.chat, '🕒', m.key)
        let json = await Func.fetchJson(API('alya', '/api/chord', { q: text }, 'apikey'))
        if (!json.status) return client.reply(m.chat, global.status.fail, m)
        let teks = `Untuk menampilkan detail chord gunakan perintah ini *${isPrefix + command} nomor*\n*Example* : ${isPrefix + command} 1\n\n`
        json.data.map((v, i) => {
          if (i < 10) {
            teks += '*' + (i + 1) + '.* ' + v.title + '\n'
            teks += '	◦  *Link* : ' + v.url + '\n\n'
          }
        })
        teks += global.footer
        client.reply(m.chat, teks, m)
      }
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  restrict: true
}