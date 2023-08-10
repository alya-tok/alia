exports.run = {
   usage: ['wallpaper'],
   hidden: ['wp'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      scrap
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `panda`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Func.fetchJson(API('alya', '/api/wallpaper', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         for (let i = 0; i < 3; i++) {
            var rand = Math.floor(json.data.length * Math.random())
            let caption = `乂  *W A L L P A P E R*\n\n`
            caption += `	◦ *Keywords* : ${json.data[rand].keywords}\n`
            caption += `	◦ *Size* : ${json.data[rand].size}\n`
            caption += `	◦ *Dimensions* : ${json.data[rand].dimention}\n\n`
            caption += global.footer
            client.sendFile(m.chat, json.data[rand].url, '', caption, m)
            await Func.delay(2000)
         }
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   restrict: true,
   limit: true
}