exports.run = {
   usage: ['nulis'],
   use: 'text',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Scraper,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'nama saya wibu'), m)
         if (text.length > 3500) return client.reply(m.chat, Func.texted('bold', `🚩 Text terlalu panjang maximum 3500 karakter.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         const json = await Func.fetchJson(API('alya', '/api/magernulis', { text: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.data.url, 'image.jpg', `🍟 *Fetching*: ${((new Date - old) * 1)} ms`, m)
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
     }
   },
   limit: true,
   error: false
}
