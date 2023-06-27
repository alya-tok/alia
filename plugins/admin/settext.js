exports.run = {
   usage: ['setwelcome', 'setleft'],
   hidden: ['setout'],
   use: 'text',
   category: 'admin tools',
   async: async (m, {
      client,
      text,
      isPrefix,
      command
   }) => {
      let setup = global.db.groups.find(v => v.jid == m.chat)
      if (command == 'setwelcome') {
         if (!text) return client.reply(m.chat, formatWel(isPrefix, command), m)
         setup.text_welcome = text
         await client.reply(m.chat, Func.texted('bold', `🚩 Berhasil di set.`), m)
      } else if (/set(out|left)/i.test(command)) {
         if (!text) return client.reply(m.chat, formatLef(isPrefix, command), m)
         setup.text_left = text
         await client.reply(m.chat, Func.texted('bold', `🚩 Berhasil di set.`), m)
      }
   },
   admin: true
}

const formatWel = (prefix, command) => {
   return `Maaf, tidak bisa kembali tanpa teks, dan penjelasan ini dan bagaimana menggunakan :

*1.* +tag : untuk menyebutkan anggota di pesan selamat datang.
*2.* +grup : untuk mendapatkan nama grup.

• *Example* : ${prefix + command} Hai +tag, selamat datang di grup +grup, semoga Anda senang bersama kami.`
}

const formatLef = (prefix, command) => {
   return `Maaf, tidak bisa kembali tanpa teks, dan penjelasan ini dan bagaimana menggunakan :

*1.* +tag : untuk menyebutkan anggota di pesan selamat tinggal.
*2.* +grup : untuk mendapatkan nama grup.

• *Example* : ${prefix + command} Bye +tag`
}