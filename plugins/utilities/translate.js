exports.run = {
   usage: ['translate'],
   hidden: ['tr'],
   use: 'iso text',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'id i love you'), m)
      if (text && m.quoted && m.quoted.text) {
         let lang = text.slice(0, 2)
         try {
            let data = m.quoted.text
            let json = await Func.fetchJson(API('alya', '/api/translate', { text: data, iso: lang }, 'apikey'))
            client.reply(m.chat, json.data.text, m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Kode bahasa tidak didukung.`), m)
         }
      } else if (text) {
         let lang = text.slice(0, 2)
         try {
            let data = text.substring(2).trim()
           let json = await Func.fetchJson(API('alya', '/api/translate', { text: data, iso: lang }, 'apikey'))
            client.reply(m.chat, json.data.text, m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Kode bahasa tidak didukung.`), m)
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}