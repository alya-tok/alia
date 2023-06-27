exports.run = {
   usage: ['q'],
   use: 'reply chat',
   category: 'group',
   async: async (m, {
      client,
      store
   }) => {
      try {
         if (!m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Membalas pesan yang berisi kutipan.`), m)
         const msg = await store.loadMessage(m.chat, m.quoted.id)
         if (msg.quoted === null) return client.reply(m.chat, Func.texted('bold', `🚩 Pesan tidak mengandung kutipan.`), m)
         return client.copyNForward(m.chat, msg.quoted.fakeObj)
      } catch (e) {
         client.reply(m.chat, `🚩 Tidak dapat memuat pesan.`, m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}