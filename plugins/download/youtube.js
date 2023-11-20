const axios = require('axios')
exports.run = {
  usage: ['ytmp3', 'ytmp4'],
  hidden: ['yta', 'ytv'],
  use: 'link',
  category: 'downloader',
  async: async (m, {
    client,
    args,
    text,
    isPrefix,
    command,
    env,
    users,
    Scraper,
    Func
  }) => {
    try {
      if (/yt?(a|mp3)/i.test(command)) {
        if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m)
        if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return client.reply(m.chat, global.status.invalid, m)
        client.sendReact(m.chat, '🕒', m.key)
        const json = await Func.fetchJson(API('alya', '/api/yta', { url: args[0] }, 'apikey'))
        if (!json.status || !json.data.url) return client.reply(m.chat, global.status.fail, m)
        let caption = `乂  *Y T - M P 3*\n\n`
        caption += `	◦  *Title* : ${json.title}\n`
        caption += `	◦  *Size* : ${json.data.size}\n`
        caption += `	◦  *Duration* : ${json.duration}\n`
        caption += `	◦  *Bitrate* : ${json.data.quality}\n\n`
        caption += global.footer
        const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
        const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scraper.shorten(json.data.url)).data.url}` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
        if (chSize.oversize) return client.reply(m.chat, isOver, m)
        client.sendMessageModify(m.chat, caption, m, {
          largeThumb: true,
          thumbnail: await Func.fetchBuffer(json.thumbnail)
        }).then(async () => {
          client.sendFile(m.chat, './' + result.file, json.data.filename, '', m, {
            document: true,
            album: 'Alya Music',
            APIC: await Func.fetchBuffer(json.thumbnail)
          })
        })
      } else if (/yt?(v|mp4)/i.test(command)) {
        if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://youtu.be/zaRFmdtLhQ8'), m)
        if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) return client.reply(m.chat, global.status.invalid, m)
        client.sendReact(m.chat, '🕒', m.key)
        const json = await Func.fetchJson(API('alya', '/api/ytv', { url: args[0] }, 'apikey'))
        if (!json.status) return client.reply(m.chat, global.status.fail, m)
        let caption = `乂  *Y T - M P 4*\n\n`
        caption += `	◦  *Title* : ${json.title}\n`
        caption += `	◦  *Size* : ${json.data.size}\n`
        caption += `	◦  *Duration* : ${json.duration}\n`
        caption += `	◦  *Quality* : ${json.data.quality}\n\n`
        caption += global.footer
        const chSize = Func.sizeLimit(json.data.size, users.premium ? env.max_upload : env.max_upload_free)
        const isOver = users.premium ? `💀 File size (${json.data.size}) exceeds the maximum limit, download it by yourself via this link : ${await (await Scraper.shorten(json.data.url)).data.url}` : `⚠️ File size (${json.data.size}), you can only download files with a maximum size of ${env.max_upload_free} MB and for premium users a maximum of ${env.max_upload} MB.`
        if (chSize.oversize) return client.reply(m.chat, isOver, m)
        client.sendFile(m.chat, './' + result.file, json.data.filename, caption, m)
      }
    } catch (e) {
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}