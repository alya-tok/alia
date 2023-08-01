const axios = require('axios')
exports.run = {
   usage: ['ig'],
   hidden: ['igdl'],
   use: 'username / link',
   category: 'downloader',
   async: async (m, {
      client,
      isPrem,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} :\n\n${isPrefix + command} nadhin_nada2\n${isPrefix + command} https://www.instagram.com/reel/CuwP3xPAl3G/?igshid=NTc4MTIwNjQ2YQ==`, m)
         if (args[0].match('instagram.com')) {
         if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Func.fetchJson(API('alya', '/api/ig', { url: Func.igFixed(args[0]) }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         json.data.map(async v => {
            client.sendFile(m.chat, v.url, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
            await Func.delay(1500)
         })
          } else {
         if (!isPrem) return client.reply(m.chat, global.status.premium, m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/ig-post', { username: args[0] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         json.data.map(async v => {
         let teks = `乂  *I N S T A G R A M*\n\n`
            teks += '	◦  *User* : ' + v.username + '\n'
            teks += '	◦  *Likes* : ' + v.likes + '\n'
            teks += '	◦  *Views* : ' + v.views + '\n'
            teks += '	◦  *Type* : ' + v.type + '\n'
            teks += '	◦  *Shortid* : ' + v.shortcode + '\n'
            teks += '	◦  *comment* : ' + v.comments + '\n'
            teks += '	◦  *Publish* : ' + v.time_created + '\n'
            teks += '	◦  *Captions* : ' + v.text + '\n\n'
            teks += global.footer
            client.sendFile(m.chat, v.downloadable, '', teks, m)
            await Func.delay(1500)
         })
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