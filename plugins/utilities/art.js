exports.run = {
   usage: ['art'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `beatiful girl, looking to viewer, warm smile,`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Func.fetchJson(API('alya', '/api/diffusion', { prompt: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
        /* for (let i = 0; i < 3; i++) {
            var rand = Math.floor(json.data.length * Math.random()) */
            client.sendFile(m.chat, json.data[0].url, 'image.jpg', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
         //   await Func.delay(2000)
        // }
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true
}