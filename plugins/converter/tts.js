exports.run = {
   usage: ['tts'],
   use: 'iso text',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'id i love you'), m)
      if (text && m.quoted && m.quoted.text) {
         let lang = text.slice(0, 2)
         try {
            let data = m.quoted.text
            let filePath = await Func.fetchJson(API('alya', '/api/tts', { text: data, iso: lang }, 'apikey'))
            if (!filePath.status) return client.reply(m.chat, Func.jsonFormat(filePath), m)
            client.sendFile(m.chat, await Func.fetchBuffer(filePath.data.url), 'audio.mp3', '', m)
         } catch {
            return client.reply(m.chat, Func.texted('bold', `🚩 Kode bahasa tidak didukung.`), m)
         }
      } else if (text) {
         let lang = text.slice(0, 2)
         try {
            let data = text.substring(2).trim()
            let filePath = await Func.fetchJson(API('alya', '/api/tts', { text: data, iso: lang }, 'apikey'))
            if (!filePath.status) return client.reply(m.chat, Func.jsonFormat(filePath), m)
            client.sendFile(m.chat, await Func.fetchBuffer(filePath.data.url), 'audio.mp3', '', m)
         } catch (e) {
            console.log(e)
            return client.reply(m.chat, Func.texted('bold', `🚩 Kode bahasa tidak didukung.`), m)
         }
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}