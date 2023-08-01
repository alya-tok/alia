exports.run = {
   regex: /http(?:s)?:\/\/(?:www\.|mobile\.)?twitter\.com\/([a-zA-Z0-9_]+)/,
   async: async (m, {
      client,
      body,
      users,
      setting
   }) => {
      try {
         const regex = /http(?:s)?:\/\/(?:www\.|mobile\.)?twitter\.com\/([a-zA-Z0-9_]+)/;
         const extract = body ? Func.generateLink(body) : null
         if (extract) {
            const links = extract.filter(v => v.match(regex))
            if (links.length != 0) {
               if (users.limit > 0) {
                  let limit = 1
                  if (users.limit >= limit) {
                     users.limit -= limit
                  } else return client.reply(m.chat, Func.texted('bold', `🚩 Limit Anda tidak cukup untuk menggunakan fitur ini.`), m)
               }
               client.sendReact(m.chat, '🕒', m.key)
               let old = new Date()
               Func.hitstat('twitter', m.sender)
               links.map(async link => {
               let json = await Func.fetchJson(API('alya', '/api/twitter', { url: link }, 'apikey'), { 'referer': 'https://savetwitter.net' })
               if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
               json.data.map(async v => {
               function _0x50ea(_0x19e74d,_0x2b49ce){const _0x18ff5e=_0x18ff();return _0x50ea=function(_0x50ea67,_0x571af6){_0x50ea67=_0x50ea67-0x117;let _0x3fc195=_0x18ff5e[_0x50ea67];return _0x3fc195;},_0x50ea(_0x19e74d,_0x2b49ce);}const _0xaf8fa9=_0x50ea;(function(_0x3cf60b,_0x29ae59){const _0x3377bd=_0x50ea,_0x32b576=_0x3cf60b();while(!![]){try{const _0xdd4ec1=parseInt(_0x3377bd(0x11f))/0x1*(-parseInt(_0x3377bd(0x11d))/0x2)+-parseInt(_0x3377bd(0x122))/0x3*(parseInt(_0x3377bd(0x11a))/0x4)+parseInt(_0x3377bd(0x124))/0x5*(-parseInt(_0x3377bd(0x11c))/0x6)+parseInt(_0x3377bd(0x11e))/0x7*(parseInt(_0x3377bd(0x121))/0x8)+-parseInt(_0x3377bd(0x118))/0x9*(-parseInt(_0x3377bd(0x127))/0xa)+parseInt(_0x3377bd(0x11b))/0xb*(parseInt(_0x3377bd(0x126))/0xc)+parseInt(_0x3377bd(0x117))/0xd*(parseInt(_0x3377bd(0x123))/0xe);if(_0xdd4ec1===_0x29ae59)break;else _0x32b576['push'](_0x32b576['shift']());}catch(_0x2a9a50){_0x32b576['push'](_0x32b576['shift']());}}}(_0x18ff,0xdef16));function _0x18ff(){const _0x37678b=['13HFJWqI','18477UniiGC','arraybuffer','1668536ajULNk','1760979CLoUKX','894pjnzZP','678ZFgwan','623iahvXs','1048Rbttow','get','125272UpuZRb','6WszLJI','7798168vEXQph','22865AvJpFF','https://savetwitter.net','24xFcFhZ','2500oDExft'];_0x18ff=function(){return _0x37678b;};return _0x18ff();}const result=await Func['getFile'](await(await axios[_0xaf8fa9(0x120)](v['url'],{'responseType':_0xaf8fa9(0x119),'headers':{'referer':_0xaf8fa9(0x125)}}))['data']);
               client.sendFile(m.chat, './' + result.file, '', '', m)
               await Func.delay(1500)
                  })
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   limit: true,
   download: true
}