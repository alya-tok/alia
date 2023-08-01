const axios = require('axios')
exports.run = {
   regex: /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/,
   async: async (m, {
      client,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /^(?:https?:\/\/)?(?:www\.)?(?:instagram\.com\/)(?:tv\/|p\/|reel\/)(?:\S+)?$/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => Func.igFixed(v).match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Limit Anda tidak cukup untuk menggunakan fitur ini.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('ig', m.sender)
               links.map(async link => {
                  let json = await Func.fetchJson(API('alya', '/api/ig', { url: Func.igFixed(link) }, 'apikey'), { 'referer': 'https://saveig.app/en' })
                  if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
                  json.data.map(async v => {
                     const result = await Func.getFile(await (await axios.get(v.url, {
                     responseType: 'arraybuffer',
                     headers: {
                     referer: 'https://saveig.app/en'
                     }
                     })).data)
                     client.sendFile(m.chat, './' + result.file, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
                     await Func.delay(1500)
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