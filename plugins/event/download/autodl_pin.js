exports.run = {
   regex: /pin(?:terest)?(?:\.it|\.com)/,
   async: async (m, {
      client,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /pin(?:terest)?(?:\.it|\.com)/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Limit Anda tidak cukup untuk menggunakan fitur ini.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('pin', m.sender)
               links.map(async link => {
               let json = await Func.fetchJson(API('alya', '/api/pins', { url: link }, 'apikey'))
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
               client.sendFile(m.chat, json.data.url, '', '', m)
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