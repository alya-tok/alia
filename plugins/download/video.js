const yts = require('yt-search'),
  axios = require('axios')
exports.run = {
  usage: ['video'],
  hidden: ['playvid', 'playvideo'],
  use: 'query',
  category: 'downloader',
  async: async (m, {
    client,
    text,
    isPrefix,
    command,
    env,
    users,
    Scraper,
    Func
  }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'lathi'), m)
      client.sendReact(m.chat, '🕒', m.key)
      const yt = await (await yts(text)).all.find(video => video.seconds < 3600)
      if (!yt.url) return client.reply(m.chat, global.status.fail, m)
      const json = await Func.fetchJson(API('alya', '/api/ytv', { url: yt.url }, 'apikey'))
      if (!json.status || !json.data.url) return client.reply(m.chat, global.status.fail, m)
      let caption = `乂  *Y T - V I D E O*\n\n`
      caption += `	◦  *Title* : ${json.title}\n`
      caption += `	◦  *Size* : ${json.data.size}\n`
      caption += `	◦  *Duration* : ${json.duration}\n`
      caption += `	◦  *Quality* : ${json.data.quality}\n\n`
      caption += global.footer
      const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
      const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scraper.shorten(json.data.url)).data.url}` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
      if (chSize.oversize) return client.reply(m.chat, isOver, m)
      client.sendFile(m.chat, json.data.url, json.data.filename, caption, m)
    } catch (e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  limit: true,
  premium: true,
  cache: true,
  location: __filename
}