exports.run = {
  regex: /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/,
  async: async (m, {
    client,
    body,
    users,
    setting,
    prefixes,
    Func,
  }) => {
    try {
      const regex = /^(?:https?:\/\/)?(?:www\.|vt\.|vm\.|t\.)?(?:tiktok\.com\/)(?:\S+)?$/;
      const extract = body ? Func.generateLink(body) : null
      if (extract) {
        const links = extract.filter(v => Func.ttFixed(v).match(regex))
        if (links.length != 0) {
          if (users.limit > 0) {
            let limit = 1
            if (users.limit >= limit) {
              users.limit -= limit
            } else return client.reply(m.chat, Func.texted('bold', `🚩 Your limit is not enough to use this feature.`), m)
          }
          client.sendReact(m.chat, '🕒', m.key)
          let old = new Date()
          Func.hitstat('tiktok', m.sender)
          links.map(async link => {
            let json = await Func.fetchJson(API('alya', '/api/tiktok', { url: Func.ttFixed(link) }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Error! private videos or videos not available.`), m)
            let caption = `乂  *T I K T O K*\n\n`
            caption += `	◦  *Author* : ${json.author.nickname} (@${json.author.fullname})\n`
            caption += `	◦  *Views* : ${Func.formatter(json.stats.views)}\n`
            caption += `	◦  *Likes* : ${Func.formatter(json.stats.likes)}\n`
            caption += `	◦  *Shares* : ${Func.formatter(json.stats.share)}\n`
            caption += `	◦  *Comments* : ${Func.formatter(json.stats.comment)}\n`
            caption += `	◦  *Duration* : ${json.durations}\n`
            caption += `	◦  *Sound* : ${json.music_info.title} - ${json.music_info.author}\n`
            caption += `	◦  *Caption* : ${json.title || '-'}\n`
            caption += `	◦  *Fetching* : ${(new Date() - old) * 1} ms\n\n`
            caption += global.footer
            let result = json.data.find(v => v.type == 'nowatermark')
            if (!result) {
              json.data.map(x => {
                client.sendFile(m.chat, x.url, Func.filename('jpg'), caption, m)
              })
            } else {
              client.sendFile(m.chat, result.url, Func.filename('mp4'), caption, m)
            }
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