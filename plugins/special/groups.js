const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
exports.run = {
  usage: ['groups'],
  category: 'special',
  async: async (m, {
    client,
    isPrefix
  }) => {
    try {
      let groupList = async () => Object.entries(await client.groupFetchAllParticipating()).slice(0).map(entry => entry[1])
      let groups = await groupList()
      if (groups.length == 0) return client.reply(m.chat, Func.texted('bold', `🚩 Bot saat ini tidak bergabung dengan grup.`), m)
      let rows = []
      let teks = `*BOT TELAH BERGABUNG KE DALAM ${groups.length} GROUPS*\n\n`
      groups.map(x => {
        let v = global.db.groups.find(v => v.jid == x.id)
        if(v) {
          teks += '   ◦ *Nama grup* : ' + x.subject + ' \n'
          teks += '   ◦ *ID grup* : ' + x.id + ' \n'
          teks += `   ◦ *Owner grup* : @${x.subjectOwner.split('@')[0] || 'Unknown'}\n`
          teks += `   ◦ *Owner created* : @${x.owner.split('@')[0] || 'Unknown'}\n`
          teks += '   ◦ *Tetap stay* : ' + (v.expired == 0 ? 'NO SET' : Func.timeReverse(v.expired - new Date() * 1)) + ' \n'
          teks += '   ◦ *Jumlah member* : ' + x.participants.length + ' \n'
          teks += '   ◦ *Dibisukan* : ' + (v.mute ? 'IYA' : 'TIDAK') + ' \n'
          teks += '   ◦ *Dibuat* : ' + moment(v.activity).format('DD/MM/YY HH:mm:ss') + ' \n\n'
        }
      })
      teks += global.footer
      client.reply(m.chat, teks, m)
    } catch(e) {
      console.log(e)
      return client.reply(m.chat, Func.jsonFormat(e), m)
    }
  },
  cache: true,
  location: __filename
}