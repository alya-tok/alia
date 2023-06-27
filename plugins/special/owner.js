exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: global.owner_name,
         number: global.owner,
         about: 'Owner & Creator'
      }], m, {
         org: 'Owner',
         website: 'https://alyachan.my.id',
         email: 'admin@alyachan.my.id'
      })
   },
   error: false,
   cache: true,
   location: __filename
}