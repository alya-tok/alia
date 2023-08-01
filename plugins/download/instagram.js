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
         	const _0x7d73c6=_0x4631;function _0x4631(_0x351d02,_0x5e33ba){const _0x3c44d9=_0x3c44();return _0x4631=function(_0x4631d9,_0x5e0a88){_0x4631d9=_0x4631d9-0x73;let _0x390b43=_0x3c44d9[_0x4631d9];return _0x390b43;},_0x4631(_0x351d02,_0x5e33ba);}function _0x3c44(){const _0x451071=['data','16170140KJPAvO','https://saveig.app/en','9340389lRbsFh','6DiWcQC','184686ptgPVs','url','5444064byXJNk','468wavKeM','1246486WFzbTs','5780439eaGluN','22tBvvVU','get','15765GbSzGI'];_0x3c44=function(){return _0x451071;};return _0x3c44();}(function(_0x464e7d,_0x382214){const _0x3425d8=_0x4631,_0x20d8e1=_0x464e7d();while(!![]){try{const _0x41f46c=-parseInt(_0x3425d8(0x75))/0x1+-parseInt(_0x3425d8(0x77))/0x2*(-parseInt(_0x3425d8(0x7f))/0x3)+-parseInt(_0x3425d8(0x74))/0x4*(-parseInt(_0x3425d8(0x79))/0x5)+-parseInt(_0x3425d8(0x7e))/0x6*(-parseInt(_0x3425d8(0x76))/0x7)+parseInt(_0x3425d8(0x73))/0x8+parseInt(_0x3425d8(0x7d))/0x9+-parseInt(_0x3425d8(0x7b))/0xa;if(_0x41f46c===_0x382214)break;else _0x20d8e1['push'](_0x20d8e1['shift']());}catch(_0x368540){_0x20d8e1['push'](_0x20d8e1['shift']());}}}(_0x3c44,0xb16a1));const result=await Func['getFile'](await(await axios[_0x7d73c6(0x78)](v[_0x7d73c6(0x80)],{'responseType':'arraybuffer','headers':{'referer':_0x7d73c6(0x7c)}}))[_0x7d73c6(0x7a)]);
            client.sendFile(m.chat, './' + result.file, '', `🍟 *Fetching* : ${((new Date - old) * 1)} ms`, m)
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