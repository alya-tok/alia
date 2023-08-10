exports.run = {
   usage: ['owner'],
   category: 'miscs',
   async: async (m, {
      client,
      env
   }) => {
      client.sendContact(m.chat, [{
         name: env.owner_name,
         number: env.owner,
         about: 'Owner & Creator'
      }], m, {
         org: 'AlyaChan APIs',
         website: 'https://api.alyachan.biz.id',
         email: 'admin@alyachan.biz.id'
      })
   },
   error: false,
   cache: true,
   location: __filename
}