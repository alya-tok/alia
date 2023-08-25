exports.run = {
   usage: ['joox'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
     client,
     text,
     args,
     isPrefix,
     command,
     Func
   }) => {
     try {
       if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'nemen'), m)
       if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
         let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?joox(?:com)?\.(?:com|be)(?:\/com\?v=|\/)([^\s&]+)/, 'gi'))
         if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari music joox.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/joox-get', {
           id: urls[text - 1].split('/')[4]
         }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         let teks = `乂  *J O O X*\n\n`
         teks += '	◦  *Title* : ' + json.data.name + ' - ' + json.data.artist + '\n'
         teks += '	◦  *Album* : ' + json.data.album + '\n'
         teks += '	◦  *Genre* : ' + json.data.genre + '\n'
         teks += '	◦  *Duration* : ' + json.data.duration + '\n'
         teks += '	◦  *Publish* : ' + json.data.release + '\n\n'
         teks += global.footer
         client.sendMessageModify(m.chat, teks, m, {
           largeThumb: true,
           thumbnail: await Func.fetchBuffer(json.data.thumbnail)
         }).then(() => {
           client.sendFile(m.chat, json.data.url, json.data.name + ' - ' + json.data.artist + '.mp3', '', m, {
             document: true,
             album: 'Alya Music',
             APIC: await Func.fetchBuffer(json.data.thumbnail)
           })
         })
       } else {
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/joox', {
           q: text
         }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
         let teks = `Untuk menampilkan music joox gunakan perintah ini *${isPrefix}joox nomor*\n*Example* : ${isPrefix + command} 1\n\n`
         json.data.map((v, i) => {
           if (i < 10) {
             teks += '*' + (i + 1) + '.* ' + v.name + ' – ' + v.artist_list[0].name + '\n'
             teks += '	◦  *Link* : https://www.joox.com/single/' + v.id + '\n\n'
           }
         })
         teks += global.footer
         client.reply(m.chat, teks, m)
       }
     } catch (e) {
       console.log(e)
       return client.reply(m.chat, Func.jsonFormat(e), m)
     }
   },
   error: false,
   limit: true,
   restrict: true
 }
 