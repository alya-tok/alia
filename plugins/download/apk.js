exports.run = {
  usage: ['apk'],
  use: 'query',
  category: 'downloader',
  async: async (m, {
    client,
    isPrefix,
    command,
    text,
    users,
    env,
    Func,
    Scraper
  }) => {
    client.apk = client.apk ? client.apk : []
    if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'vpn'), m)
    const check = client.apk.find(v => v.jid == m.sender)
    if (!check && !isNaN(text)) return m.reply(Func.texted('bold', `🚩 Your session has expired / does not exist, do another search using the keywords you want.`))
    if (check && !isNaN(text)) {
      if (Number(text) > check.results.length) return m.reply(Func.texted('bold', `🚩 Exceed amount of data.`))
      client.sendReact(m.chat, '🕒', m.key)
      const json = await Func.fetchJson(API('alya', '/api/apkget', { path: check.results[Number(text) - 1] }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      let teks = `乂  *A P K*\n\n`
      teks += '  ◦  *Name* : ' + json.data.name + '\n'
      teks += '  ◦  *Size* : ' + json.data.size + '\n'
      teks += '  ◦  *Version* : ' + json.data.version + '\n'
      teks += '  ◦  *Update* : ' + json.data.updated + '\n\n'
      teks += global.footer
      const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
      const isOver = users.premium ? `💀 The file size (${json.data.size}) exceeds the maximum limit, download it yourself via this link : ${json.data.url}` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum ${env.max_upload} MB.`
      if (chSize.oversize) return client.reply(m.chat, isOver, m)
      client.sendMessageModify(m.chat, teks, m, {
        largeThumb: true,
        thumbnail: json.data.thumbnail
      }).then(() => {
        client.sendFile(m.chat, json.data.url, json.data.name + '.apk', '', m)
      })
    } else {
      client.sendReact(m.chat, '🕒', m.key)
      const json = await Func.fetchJson(API('alya', '/api/apk', {
        q: text
      }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      if (!check) {
        client.apk.push({
          jid: m.sender,
          query: text,
          results: json.data.map(v => v.path),
          created_at: new Date * 1
        })
      } else check.results = json.data.map(v => v.path)
      let p = `To download apk use this command *${isPrefix + command} number*\n`
      p += `*Example* : ${isPrefix + command} 1\n\n`
      json.data.map((v, i) => {
        p += `*${i + 1}*. ${v.name}\n`
        p += `◦ *Size* : ${v.size}\n`
        p += `◦ *Rating* : ${v.rating}\n`
        p += `◦ *Category* : ${v.category}\n`
        p += `◦ *Developer* : ${v.developer}\n\n`
      }).join('\n\n')
      p += global.footer
      client.reply(m.chat, p, m)
    }
    setInterval(async () => {
      const session = client.apk.find(v => v.jid == m.sender)
      if (session && new Date - session.created_at > env.timeout) {
        Func.removeItem(client.apk, session)
      }
    }, 60_000)
  },
  limit: true,
  location: __filename
}