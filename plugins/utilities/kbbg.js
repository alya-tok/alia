exports.run = {
   usage: ['kbbg'],
   use: 'word',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'sasimo'), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await await Func.fetchJson(API('alya', '/api/kbbg', { q: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let teks = `乂  *K B B G*\n\n`
         teks += json.data.description
         client.reply(m.chat, teks, m)
      } catch {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true
}