exports.run = {
   usage: ['flaming', 'shadow', 'metallic', 'neondrak', 'neonglow', 'rainbow', 'graffiti', 'vintage', 'gradient', 'illuminated'],
   use: 'text',
   category: 'image - maker',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Scraper,
      Func
   }) => {
      try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Alya bot'), m)
            if (text.length > 10) return client.reply(m.chat, Func.texted('bold', `🚩 Teks terlalu panjang maksimal 10 karakter.`), m)
            let old = new Date()
            await client.sendReact(m.chat, '🕒', m.key)
            let result = await Func.fetchJson(API('alya', '/api/' + command.toLowerCase(), { text: text }, 'apikey'))
            if (!result.status) return client.reply(m.chat, Func.jsonFormat(result), m)
            client.sendFile(m.chat, result.data.url, ``, `🍟 *Process* : ${((new Date - old) * 1)} ms`, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}