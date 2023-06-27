exports.run = {
   usage: ['twitter'],
   hidden: ['tw', 'twdl'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://twitter.com/mosidik/status/1475812845249957889?s=20'), m)
         if (!args[0].match(/(twitter.com)/gi)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/twitter', { url: args[0] }, 'apikey'))
         let old = new Date()
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let caption = `乂  *T W I T T E R*\n\n`         
         caption += `	◦  *Acount* : ${json.username}\n`         
         caption += `	◦  *Author* : ${json.nickname}\n`
         caption += `	◦  *Likes* : ${json.like_count}\n`
         caption += `	◦  *Views* : ${json.view_count}\n`
         caption += `	◦  *duration* : ${json.duration}\n`
         caption += `	◦  *Comments* : ${json.comment_count}\n`
         caption += `	◦  *Captions* : ${json.title}\n\n`
         caption += global.footer                     
         client.sendFile(m.chat, json.data.url, '', caption, m)
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: false,
   location: __filename
}