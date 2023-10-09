exports.run = {
  usage: ['tiktok', 'tikmp3', 'tikwm'],
  hidden: ['tt'],
  category: 'downloader',
  async: async (m, {
    client,
    args,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (/tt|tik(tok|wm|mp3)?/.test(command)) {
        if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://vm.tiktok.com/ZSR7c5G6y/'), m)
        if (!args[0].match('tiktok.com')) return client.reply(m.chat, global.status.invalid, m)
        client.sendReact(m.chat, '🕒', m.key)
        let old = new Date()
        let json = await Func.fetchJson(API('alya', '/api/tiktok', { url: Func.ttFixed(args[0]) }, 'apikey'))
        if (!json.status) return client.reply(m.chat, Func.texted('bold', `🚩 Error! private videos or videos not available.`), m)
        let caption = `乂  *T I K T O K*\n\n`
        caption += `	◦  *Author* : ${json.author.nickname} (@${json.author.fullname})\n`
        caption += `	◦  *Views* : ${Func.formatter(json.stats.views)}\n`
        caption += `	◦  *Likes* : ${Func.formatter(json.stats.likes)}\n`
        caption += `	◦  *Shares* : ${Func.formatter(json.stats.share)}\n`
        caption += `	◦  *Comments* : ${Func.formatter(json.stats.comment)}\n`
        caption += `	◦  *Duration* : ${Func.toTime(json.durations)}\n`
        caption += `	◦  *Sound* : ${json.music_info.title} - ${json.music_info.author}\n`
        caption += `	◦  *Caption* : ${json.title || '-'}\n`
        caption += `	◦  *Fetching* : ${(new Date() - old) * 1} ms\n\n`
        caption += global.footer
        if (command == 'tiktok' || command == 'tt') {
          let result = json.data.find(v => v.type == 'nowatermark')
          if (!result) {
            json.data.map(x => {
              client.sendFile(m.chat, x.url, 'image.jpg', caption, m)
            })
          } else {
            client.sendFile(m.chat, result.url, 'video.mp4', caption, m)
          }
          if (command == 'tikwm' || command == 'ttwm') return client.sendFile(m.chat, json.data.video_wm, 'video.mp4', caption, m)
          if (command == 'tikmp3' || command == 'ttaudio')
            return !json.data.music ? client.reply(m.chat, global.status.fail, m): client.sendFile(m.chat, json.data.music, 'audio.mp3', '', m)
        }
      }
    } catch (e) {
      console.log(e)
      return m.reply(status.error)
    }
  },
  error: false,
  limit: true,
  cache: true,
  location: __filename
}