const axios = require('axios')
exports.run = {
   usage: ['fetch'],
   hidden: ['get'],
   use: 'link',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (/get|fetch/i.test(command)) {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, global.db.setting.cover), m)
         if (!/https|http/i.test(args[0])) return client.reply(m.chat, global.status.wrong, m)
         client.sendReact(m.chat, '🕒', m.key)
         const fetch = await axios.get(args[0], {
            headers: {
               "Access-Control-Allow-Origin": "*",
               "Referer": "https://www.google.com/",
               "Referrer-Policy": "strict-origin-when-cross-origin",
               "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
            }
         })
         if (/json/i.test(fetch.headers['content-type'])) return client.reply(m.chat, Func.jsonFormat(fetch.data), m)
         if (/text/i.test(fetch.headers['content-type'])) return client.reply(m.chat, fetch.data, m)
         client.sendFile(m.chat, args[0], '', '', m)
      }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}