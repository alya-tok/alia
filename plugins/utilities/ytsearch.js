const yts = require('yt-search')
exports.run = {
   usage: ['ytsearch'],
   hidden: ['yts', 'getvideo', 'getmusic'],
   use: 'query',
   category: 'utilities',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {         
         if (!text) return client.reply(m.chat, `• ${Func.texted('bold', `Example`)} : ${isPrefix + command} lathi`, m)
         if (command == 'getmusic') {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
        if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari youtube.`), m)
         client.sendReact(m.chat, '🕒', m.key)
         const json = await require('lib/y2mate').yta(urls[text - 1])
         if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let caption = `乂  *Y T - P L A Y*\n\n`
            caption += `	◦  *Title* : ${json.title}\n`
            caption += `	◦  *Size* : ${json.data.size}\n`
            caption += `	◦  *Duration* : ${json.duration}\n`
            caption += `	◦  *Bitrate* : ${json.data.quality}\n\n`
            caption += global.footer
            let chSize = Func.sizeLimit(json.data.size, global.max_upload)
            if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.data.size}) melebihi batas maksimum, unduh sendiri melalui tautan ini : ${await (await scrap.shorten(json.data.url)).data.url}`, m)
            client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer(json.thumbnail)
            }).then(async () => {
               client.sendFile(m.chat, json.data.url, json.data.filename, '', m, {
                  document: true,
                  APIC: await Func.fetchBuffer(json.thumbnail)
               })
            })
         } else if (command == 'getvideo') {
        if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
        let urls = m.quoted.text.match(new RegExp(/(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/, 'gi'))
        if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari youtube.`), m)
        client.sendReact(m.chat, '🕒', m.key)
          const json = await require('lib/y2mate').ytv(urls[text - 1])
          if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let caption = `乂  *Y T - M P 4*\n\n`
            caption += `	◦  *Title* : ${json.title}\n`
            caption += `	◦  *Size* : ${json.data.size}\n`
            caption += `	◦  *Duration* : ${json.duration}\n`
            caption += `	◦  *Quality* : ${json.data.quality}\n\n`
            caption += global.footer
             let chSize = Func.sizeLimit(json.data.size, global.max_upload)
            if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.data.size}) melebihi batas maksimum, unduh sendiri melalui tautan ini : ${await (await scrap.shorten(json.data.url)).data.url}`, m)
            let isSize = (json.data.size).replace(/MB/g, '').trim()
            if (isSize > 99) return client.sendMessageModify(m.chat, caption, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer(json.thumbnail)
            }).then(async () => await client.sendFile(m.chat, json.data.url, json.data.filename, '', m, {
               document: true
            }))
            client.sendFile(m.chat, json.data.url, Func.filename('mp4'), caption, m)
         } else if (command == 'yts' || command == 'ytsearch') {
          client.sendReact(m.chat, '🕒', m.key)
          let yt = await (await yts(text)).all
          if (yt.length == 0) return client.reply(m.chat, global.status.fail, m)
           let teks = `Untuk menampilkan youtube gunakan perintah ini *${isPrefix}getmusic* atau *${isPrefix}getvideo nomor*\n*Example* : ${isPrefix}getvideo 1\n\n`
           yt.map((v, i) => {
           if (i < 10) {
           teks += '*' + (i + 1) + '.* ' + v.title + '\n'
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