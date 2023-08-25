exports.run = {
   usage: ['igh'],
   use: 'username / link',
   category: 'downloader',
   async: async (m, {
     client,
     isPrem,
     args,
     isPrefix,
     command,
     Func
   }) => {
     try {
       if (!args || !args[0]) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} :\n\n${isPrefix + command} ilham_jebor\n${isPrefix + command} https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTU1MDMwNzEwMTYxNjEw?story_media_id=2623989835414443580_40819912280&igshid=NTc4MTIwNjQ2YQ==`, m)
       if (args[0].match('instagram.com')) {
         if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let old = new Date()
         let json = await Func.fetchJson(API('alya', '/api/igh', {
           url: Func.igFixed(args[0])
         }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         json.data.map(async v => {
           client.sendFile(m.chat, v.url, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
           await Func.delay(1500)
         })
       } else {
         if (!isPrem) return client.reply(m.chat, global.status.premium, m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/igh2', {
           username: args[0]
         }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         json.data.map(async o => {
           let js = await Func.fetchJson(API('alya', '/api/igh2-get', {
             foid: o.foid
           }, 'apikey'))
           if (!js.status) return client.reply(m.chat, Func.jsonFormat(js), m)
           js.data.map(async v => {
             if (v.type == 'GraphStoryImage') return client.sendFile(m.chat, v.thumb, '', '', m)
             if (v.type == 'GraphStoryVideo') return client.sendFile(m.chat, v.video, '', '', m)
             await Func.delay(1500)
           })
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
 