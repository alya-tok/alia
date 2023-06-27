const axios = require('axios')
exports.run = {
   usage: ['qc'],
   use: 'text',
   category: 'converter',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'Hi!'), m)
         if (text.length > 30) return client.reply(m.chat, Func.texted('bold', `🚩 Max 30 character.`), m)
         const exif = global.db.setting
         try {
            pic = await client.profilePictureUrl(m.quoted ? m.quoted.sender : m.sender, 'image')
         } catch {
            pic = 'https://srv.neoxr.tk/files/z8hI5T.jpg'
         }
         const json = await Func.fetchJson(API('alya', '/api/fakechat', { q: text, avatar: pic, name: m.quoted ? global.db.users.find(v => v.jid == m.quoted.sender).name : m.pushName }, 'apikey'))
         if (!json.status) return m.reply(Func.jsonFormat(json))
         client.sendSticker(m.chat, json.data.url, m, {
            packname: exif.sk_pack,
            author: exif.sk_author
         })
      } catch (e) {
         console.log(e)
         client.reply(m.chat, Func.texted('bold', `🚩 Tidak dapat membuat stiker.`), m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}