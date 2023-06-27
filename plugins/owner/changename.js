exports.run = {
   usage: ['changename'],
   use: 'text',
   category: 'owner',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      try {
         if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'neoxr bot'), m)
         if (text.length > 25) return client.reply(m.chat, `🚩 Teks terlalu panjang, maksimal 25 karakter.`, m)
         client.authState.creds.me.name = text
         await props.save(global.db)
         return client.reply(m.chat, `🚩 Nama berhasil diubah.`, m)
      } catch {
         return client.reply(m.chat, Func.texted('bold', `🚩 Nama gagal diubah.`), m)
      }
   },
   owner: true
}