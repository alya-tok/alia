exports.run = {
   usage: ['limit'],
   category: 'user info',
   async: async (m, {
      client,
      isPrefix,
   }) => {
      let user = global.db.users.find(v => v.jid == m.sender)
      if (user.limit < 1) return client.reply(m.chat, `🚩 Penggunaan bot Anda telah mencapai batas dan akan disetel ulang pada pukul 00.00\n\nUntuk mendapatkan lebih banyak batas, tingkatkan ke paket premium kirim *${isPrefix}premium*`, m)
      client.reply(m.chat, `🍟 Limit Anda : [ *${Func.formatNumber(user.limit)}* ]${!user.premium ? `\n\nUntuk mendapatkan lebih banyak limit, Upgrade ke premium, dengan mengirimkan perintah *${isPrefix}premium*` : ''}`, m)
   },
   error: false
}