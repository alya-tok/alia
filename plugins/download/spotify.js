exports.run = {
   usage: ['spotify'],
   use: 'query / link',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      isPrefix,
      command,
      Func
   }) => {
      try {         
         if (!text) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} :\n\n${isPrefix + command} https://open.spotify.com/track/6cHCixTkEFATjcu5ig8a7I`, m)         
         client.sendReact(m.chat, '🕒', m.key)
         if (text.match('open.spotify.com')) {
         const json = await Func.fetchJson(API('alya', '/api/spotifydl', { url: text }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)         
         let caption = `乂  *S P O T I F Y*\n\n`
         caption += `	◦  *Title* : ${json.data.title} (${json.data.artist})\n`
         caption += `	◦  *Size* : ${json.data.size}\n`
         caption += `	◦  *Duration* : ${json.data.duration}\n`
         caption += `	◦  *Publish* : ${json.data.publish}\n\n`
         caption += global.footer
         return client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.thumbnail)
         }).then(async () => {
            client.sendFile(m.chat, json.data.url, json.data.artist + ' ' + json.data.title + '.mp3', '', m, {
               document: true,
               APIC: await Func.fetchBuffer(json.data.thumbnail)
            })
         })
         } else if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
        if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:spotify\.be\/|(?:open\.|m\.)?spotify\.com\/(?:track|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
        if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari spotify.`), m)
        client.sendReact(m.chat, '🕒', m.key)
         const json = await Func.fetchJson(API('alya', '/api/spotifydl', { url: urls[text - 1] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, global.status.fail, m)         
         let caption = `乂  *S P O T I F Y*\n\n`
         caption += `	◦  *Title* : ${json.data.title} (${json.data.artist})\n`
         caption += `	◦  *Size* : ${json.data.size}\n`
         caption += `	◦  *Duration* : ${json.data.duration}\n`
         caption += `	◦  *Publish* : ${json.data.publish}\n\n`
         caption += global.footer
         return client.sendMessageModify(m.chat, caption, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.thumbnail)
         }).then(async () => {
            client.sendFile(m.chat, json.data.url, json.data.artist + ' ' + json.data.title + '.mp3', '', m, {
               document: true,
               APIC: await Func.fetchBuffer(json.data.thumbnail)
            })
         })     
         } else {
          client.sendReact(m.chat, '🕒', m.key)
           let json = await Func.fetchJson(API('alya', '/api/spotify', { q: text }, 'apikey'))
           if (!json.status) return client.reply(m.chat, global.status.fail, m)
           let teks = `Untuk menampilkan spotify gunakan perintah ini *${isPrefix}spotify nomor*\n*Example* : ${isPrefix + command} 1\n\n`
           json.data.map((v, i) => {
           if (i < 10) {
           teks += '*' + (i + 1) + '.* ' + v.title + ' – ' + v.artist + '\n'
           teks += '	◦  *Link* : ' + v.url + '\n\n'
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
   cache: true,
   location: __filename
}