const kehapus = require('fs').readFileSync(`./media/image/hapus.webp`)
exports.run = {
   async: async (m, {
      client,
      groupSet
   }) => {
      try {
         if (m.msg && m.msg.type == 0) {
            const copy = await client.deleteObj(m, client)
            if (m.isGroup && groupSet.antidelete) {
               if (copy) {
                  client.sendSticker(m.chat, kehapus, m, {
                  pack: global.db.setting.sk_pack,
                  author: global.db.setting.sk_author
                  })
                  return await Func.delay(2000).then(() => client.copyNForward(m.chat, copy))
               }
            }
         }
        if (!m.isGroup && m.msg && m.msg.type == 0) {
         const copy = await client.deleteObj(m, client)
         if (copy) {
            client.reply(m.chat, Func.texted('bold', `📡 Sistem mendeteksi anda telah menghapus pesan.`), m).then(async () => {
               await client.copyNForward(m.chat, copy)
            })
         }
      }
      } catch (e) {
         console.log(String(e))
      }
   },
   error: false,
   cache: true,
   location: __filename
}