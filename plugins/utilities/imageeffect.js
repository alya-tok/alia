exports.run = {
   usage: ['jail', 'blur', 'invert', 'sepia', 'wasted', 'wanted', 'triggered', 'greyscale', '300years', 'affusion', 'approved', 'badge', 'badslap', 'beautiful', 'blurple', 'btazers', 'burn', 'challenger', 'circle', 'contrast', 'crush', 'gay', 'ddungeon', 'deepfry', 'dictator'],
   use: 'reply photo',
   category: 'image - effect',
   async: async (m, {
      client,
      args,
      isPrefix,
      command,
      scrap
   }) => {
      try {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Reply atau tag photo dengan caption ${isPrefix + command}`), m)
            let img = await q.download()
            if (!img) return client.reply(m.chat, Func.texted('bold', `🚩 Reply atau tag photo dengan caption ${isPrefix + command}`), m)
            let old = new Date()
            await client.sendReact(m.chat, '🕒', m.key)
            let json = await scrap.uploadImage(img)
            let result = await Func.fetchJson(API('alya', '/api/' + command.toLowerCase(), { url: json.data.url }, 'apikey'))
            if (!result.status) return client.reply(m.chat, Func.jsonFormat(result), m)
            client.sendFile(m.chat, result.data.url, ``, `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   premium: true,
   limit: true
}