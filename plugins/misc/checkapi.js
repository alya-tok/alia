exports.run = {
   usage: ['checkapi'],
   category: 'miscs',
   async: async (m, {
      client,
      Func
   }) => {
      try {
         let json = await Func.fetchJson(API('alya', '/v1/check-key', {}, 'apikey'))
         await client.reply(m.chat, Func.jsonFormat(json), m)
      } catch (e) {
         client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}