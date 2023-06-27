exports.run = {
   async: async (m, {
      client,
      body,
      users
   }) => {
      try {
         let afk = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
         for (let jid of afk) {
            let is_user = global.db.users.find(v => v.jid == jid)
            if (!is_user) continue
            let afkTime = is_user.afk
            if (!afkTime || afkTime < 0) continue
            let reason = is_user.afkReason || ''
            if (!m.fromMe) {
               client.reply(m.chat, `*Jauh Dari Keyboard* : @${jid.split('@')[0]}\n• *Alasan* : ${reason ? reason : '-'}\n• *Selama* : [ ${Func.toTime(new Date - afkTime)} ]`, m).then(async () => {
                  client.reply(jid, `Seseorang dari *${await (await client.groupMetadata(m.chat)).subject}*'grup, menandai atau menyebut anda.\n\n• *Pengirim* : @${m.sender.split('@')[0]}`, m).then(async () => {
                     await client.copyNForward(jid, m)
                  })
               })
            }
         }
      } catch (e) {
         return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   group: true,
   cache: true,
   location: __filename
}