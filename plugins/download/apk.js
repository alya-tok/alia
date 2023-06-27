exports.run = {
   usage: ['apk'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command
   }) => {
      try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'fb lite'), m)
            if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
            if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
            let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?play.google(?:com)?\.(?:com|be)(?:\/com\?v=|\/)([^\s&]+)/, 'gi'))
            if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari google playstore.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(API('alya', '/api/apkget', { url: urls[text - 1] }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let teks = `乂  *P L A Y S T O R E*\n\n`
            teks += '	◦  *Name* : ' + json.data.title + '\n'
            teks += '	◦  *Review* : ' + json.data.reviews + '\n'
            teks += '	◦  *Size* : ' + json.data.file.size + '\n'
            teks += '	◦  *Rating* : ' + json.data.rating + '\n'
            teks += '	◦  *Installed* : ' + json.data.installed + '\n'
            teks += '	◦  *Developer* : ' + json.data.developer + '\n'
            teks += '	◦  *Publish* : ' + json.data.updated + '\n'
            teks += '	◦  *Link* : ' + 'https://play.google.com/store/apps/details?id=' + json.data.package + '\n\n'
            teks += global.footer
            let chSize = Func.sizeLimit(json.data.file.size, global.max_upload)
            if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.data.file.size}) melebihi batas maksimum, unduh sendiri melalui tautan ini : ${await (await scrap.shorten(json.data.file.url)).data.url}`, m)
            client.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.icon) }).then(() => {
               client.sendFile(m.chat, json.data.file.url, json.data.title + '.apk', '', m)
            })
            } else {
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(API('alya', '/api/apk', { q: text }, 'apikey'))
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let teks = `Untuk menampilkan aplikasi gunakan perintah ini *${isPrefix}apk nomor*\n*Example* : ${isPrefix + command} 1\n\n`
            json.data.map((v, i) => {
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
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true
}