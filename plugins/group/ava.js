exports.run = {
   usage: ['ava'],
   use: 'mention or reply',
   category: 'group',
   async: async (m, {
      client,
      text
   }) => {
      let number = isNaN(text) ? (text.startsWith('+') ? text.replace(/[()+\s-]/g, '') : (text).split`@` [1]) : text
      if (!text && !m.quoted) return client.reply(m.chat, Func.texted('bold', `🚩 Sebutkan atau balas target obrolan.`), m)
      if (isNaN(number)) return client.reply(m.chat, Func.texted('bold', `🚩 Nomor tidak valid.`), m)
      if (number.length > 15) return client.reply(m.chat, Func.texted('bold', `🚩 Format yang tidak valid.`), m)
      try {
         if (text) {
            var user = number + '@s.whatsapp.net'
         } else if (m.quoted.sender) {
            var user = m.quoted.sender
         } else if (m.mentionedJid) {
            var user = number + '@s.whatsapp.net'
         }
      } catch (e) {} finally {
         let pic = false
         try {
            pic = await client.profilePictureUrl(user, 'image')
         } catch {} finally {
            if (!pic) return client.reply(m.chat, Func.texted('bold', `🚩 Dia tidak memasang gambar profil.`), m)
            client.sendFile(m.chat, pic, '', '', m)
         }
      }
   },
   error: false,
   cache: true,
   location: __filename
}