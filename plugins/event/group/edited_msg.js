exports.run = {
   async: async (m, {
      client
   }) => {
      try {
         if (m.mtype == 'editedMessage') {
            const json = await client.editObj(m, client)
            if (!json.status) return
            let teks = `乂  *E D I T E D*\n\n`
            teks += `@${json.data.jid.replace(/@.+/, '')} mengedit pesan.\n\n`
            teks += `➠ *Dari* : ${json.data.from}\n`
            teks += `➠ *Ke* : ${json.data.to}\n\n`
            teks += global.footer
            return m.reply(teks)
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