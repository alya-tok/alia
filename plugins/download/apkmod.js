exports.run = {
   usage: ['apkmod'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command,
      env
   }) => {
      try {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'vpn'), m)
            if (/(1|2|3|4|5|6|7|8|9|10)/i.test(text)) {
            if (!m.quoted) return client.reply(m.chat, Func.texted('bold', '🚩 Reply pesan yang mengandung url RexGexp'), m)
            let urls = m.quoted.text.match(new RegExp(/(?:https?:\/{2})?(?:w{3}\.)?m.playmods(?:net)?\.(?:net|be)(?:\/net\?v=|\/)([^\s&]+)/, 'gi'))
            if (!urls) return client.reply(m.chat, Func.texted('bold', `🚩 Mungkin pesan yang Anda balas tidak berisi hasil penelusuran dari apkmod.`), m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(API('alya', '/api/apkmodget', { url: urls[text - 1] }, 'apikey'))
            if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
            let teks = `乂  *A P K M O D*\n\n`
            teks += '	◦  *Name* : ' + json.data.name + '\n'
            teks += '	◦  *Size* : ' + json.data.size + '\n'
            teks += '	◦  *Mods* : ' + json.data.mod + '\n'
            teks += '	◦  *Rating* : ' + json.data.rating + '\n'
            teks += '	◦  *Version* : ' + json.data.version + '\n'
            teks += '	◦  *Developer* : ' + json.data.author + '\n'
            teks += '	◦  *Category* : ' + json.data.category + '\n'
            teks += '	◦  *Publish* : ' + json.data.published + '\n\n'
            teks += global.footer
            let chSize = Func.sizeLimit(json.data.size, env.max_upload)
            if (chSize.oversize) return client.reply(m.chat, `💀 Ukuran file (${json.data.size}) melebihi batas maksimum, unduh sendiri melalui tautan ini : ${await (await scrap.shorten(json.file.url)).data.url}`, m)
            client.sendMessageModify(m.chat, teks, m, {
            largeThumb: true,
            thumbnail: await Func.fetchBuffer(json.data.thumbnail) }).then(() => {
               client.sendFile(m.chat, json.file.url, json.file.filename, '', m)
            })
            } else {
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Func.fetchJson(API('alya', '/api/apkmod', { q: text }, 'apikey'))
            if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let teks = `Untuk menampilkan aplikasi mod gunakan perintah ini *${isPrefix + command} nomor*\n*Example* : ${isPrefix + command} 1\n\n`
            json.data.map((v, i) => {
            if (i < 10) {
            teks += '*' + (i + 1) + '.* ' + v.name + '\n'
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