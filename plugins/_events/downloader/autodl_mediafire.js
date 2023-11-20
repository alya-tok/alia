const { decode } = require('html-entities')
exports.run = {
  regex: /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/,
  async: async (m, {
    client,
    body,
    users,
    setting,
    env,
    Func
  }) => {
    try {
      const regex = /^(?:https?:\/\/)?(?:www\.)?(?:mediafire\.com\/)(?:\S+)?$/;
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
          Func.hitstat('mediafire', m.sender)
          links.map(async link => {
            let json = await Func.fetchJson(API('alya', '/api/mediafire', { url: link }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let text = `乂  *M E D I A F I R E*\n\n`
            text += '  ◦  *Name* : ' + unescape(decode(json.data.filename)) + '\n'
            text += '  ◦  *Size* : ' + json.data.filesize + '\n'
            text += '  ◦  *Extension* : ' + json.data.ext + '\n'
            text += '  ◦  *Mime* : ' + json.data.mimetype + '\n'
            text += '  ◦  *Uploaded* : ' + json.data.uploadAt + '\n\n'
            text += global.footer
            const chSize = Func.sizeLimit(json.data.filesize, users.premium ? env.max_upload : env.max_upload_free)
            const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scraper.shorten(json.data.link)).data.url}` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
            if (chSize.oversize) return client.reply(m.chat, isOver, m)
            client.sendMessageModify(m.chat, text, m, {
              largeThumb: true,
              thumbnail: await Func.fetchBuffer('https://telegra.ph/file/fcf56d646aa059af84126.jpg')
            }).then(async () => {
              client.sendFile(m.chat, json.data.link, unescape(decode(json.data.filename)), '', m)
            })
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