exports.run = {
   async: async (m, {
      client,
      users,
      chats,
      isAdmin,
      isBotAdmin,
      isOwner,
      groupSet
   }) => {
      try {
         let unban = new Date(users.banTemp + global.timer)
         if (new Date - users.banTemp > global.timer) {
            if (!users.banned && !m.fromMe) {
               users.spam += 1
               let spam = users.spam
               if (spam >= 2) setTimeout(() => {
                  users.spam = 0
               }, global.cooldown * 1000)
               if (users.banTimes >= 3) return client.reply(m.chat, `🚩 Anda di banned permanen karena sudah di banned sementara sebanyak 3 kali.`, m).then(() => {
                  users.banned = true
                  users.banTemp = 0
                  users.banTimes = 0
               })
               if (m.isGroup && spam == 4) return client.reply(m.chat, `🚩 Sistem mendeteksi Anda melakukan spam, harap tunggu selama *${global.cooldown} detik*.`, m)
               if (m.isGroup && spam >= 5) return client.reply(m.chat, `🚩 Anda di banned sementara selama ${((global.timer / 1000) / 60)} menit karena spam.`, m).then(() => {
                  users.banTemp = new Date() * 1
                  users.banTimes += 1
                  if (!isOwner && chats) {
                     if (new Date() * 1 - chats.command > global.cooldown * 1000) {
                        chats.command = new Date() * 1
                     } else {
                        if (!m.fromMe) return
                     }
                  }
               })
               if (!m.isGroup && spam == 4) return client.reply(m.chat, `🚩 Sistem mendeteksi Anda melakukan spam, harap tunggu selama *${global.cooldown} detik*.`, m)
               if (!m.isGroup && spam >= 5) return client.reply(m.chat, `🚩 Anda di banned sementara selama ${((global.timer / 1000) / 60)} menit karena spam.`, m).then(() => {
                  users.banTemp = new Date() * 1
                  users.banTimes += 1
               })
            }
         } else return
      } catch (e) {
         // return client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   cache: true,
   location: __filename
}