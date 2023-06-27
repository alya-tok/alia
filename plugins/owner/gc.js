exports.run = {
   usage: ['gc', 'modify'],
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return
         if (command == 'gc') {
            let jid = args[0]
            let rows = [{
               title: 'STAY 1 DAY',
               rowId: `${isPrefix}modify ${jid} 1D`,
               description: ``
            }, {
               title: 'STAY 1 WEEK',
               rowId: `${isPrefix}modify ${jid} 7D`,
               description: ``
            }, {
               title: 'STAY 1 MONTH',
               rowId: `${isPrefix}modify ${jid} 30D`,
               description: ``
            }, {
               title: 'STAY FOREVER',
               rowId: `${isPrefix}modify ${jid} 1`,
               description: ``
            }, {
               title: 'GET LINK',
               rowId: `${isPrefix}modify ${jid} 2`,
               description: ``
            }, {
               title: 'LEAVE',
               rowId: `${isPrefix}modify ${jid} 3`,
               description: ``
            }, {
               title: 'MUTE',
               rowId: `${isPrefix}modify ${jid} 4`,
               description: ``
            }, {
               title: 'UNMUTE',
               rowId: `${isPrefix}modify ${jid} 5`,
               description: ``
            }, {
               title: 'CLOSE',
               rowId: `${isPrefix}modify ${jid} 6`,
               description: ``
            }, {
               title: 'OPEN',
               rowId: `${isPrefix}modify ${jid} 7`,
               description: ``
            }, {
               title: 'STEAL',
               rowId: `${isPrefix}modify ${jid} 8`,
               description: ``
            }, {
               title: 'RESET TIME',
               rowId: `${isPrefix}modify ${jid} 9`,
               description: ``
            }]
            client.sendList(m.chat, '', `Option to set ${await (await client.groupMetadata(jid)).subject} group. 🍟`, '', 'Tap!', [{
               rows
            }], m)
         } else if (command == 'modify') {
            if (!args[1]) return
            let jid = args[0]
            let dial = args[1]
            let groupMetadata = await (await client.groupMetadata(jid))
            let groupName = groupMetadata.subject
            let adminList = await client.groupAdmin(jid)
            let admin = adminList.includes((client.user.id.split`:` [0]) + '@s.whatsapp.net')
            let now = new Date() * 1
            if (/1D|7D|30D/.test(dial)) {
               let day = 86400000 * parseInt(dial.replace('D', ''))
               global.db.groups.find(v => v.jid == jid).expired = now + day
               global.db.groups.find(v => v.jid == jid).stay = false
               return client.reply(m.chat, Func.texted('bold', `🚩 Durasi bot berhasil disetel untuk bertahan ${dial.replace('D', ' day')} di in ${groupName} group.`), m)
            } else if (dial == 1) {
               global.db.groups.find(v => v.jid == jid).expired = 0
               global.db.groups.find(v => v.jid == jid).stay = true
               return client.reply(m.chat, Func.texted('bold', `🚩 Berhasil menyetel bot agar tetap selamanya ${groupName} group.`), m)
            } else if (dial == 2) {
               if (!admin) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa mengambil ${groupName} tautan grup karena bot bukan admin.`), m)
               client.reply(m.chat, 'https://chat.whatsapp.com/' + (await client.groupInviteCode(jid)), m)
            } else if (dial == 3) {
               await client.reply(jid, `🚩 Good Bye!`, null, {
                  mentions: groupMetadata.participants.map(v => v.id)
               }).then(() => {
                  client.groupLeave(jid).then(() => {
                     global.db.groups.find(v => v.jid == jid).expired = 0
                     global.db.groups.find(v => v.jid == jid).stay = false
                     return client.reply(m.chat, Func.texted('bold', `🚩 Berhasil keluar dari ${groupName} group.`), m)
                  })
               })
            } else if (dial == 4) {
               global.db.groups.find(v => v.jid == jid).mute = true
               client.reply(m.chat, Func.texted('bold', `🚩 Bot berhasil di muted in ${groupName} group.`), m)
            } else if (dial == 5) {
               global.db.groups.find(v => v.jid == jid).mute = false
               client.reply(m.chat, Func.texted('bold', `🚩 Bot berhasil di unmute ${groupName} group.`), m)
            } else if (dial == 6) {
               if (!admin) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa ditutup ${groupName} tautan grup karena bot bukan admin.`), m)
               client.groupSettingUpdate(jid, 'announcement').then(() => {
                  client.reply(jid, Func.texted('bold', `🚩 Gagal menutup ${groupName}`)).then(() => {
                     client.reply(m.chat, Func.texted('bold', `🚩 Berhasil menutup ${groupName} group.`), m)
                  })
               })
            } else if (dial == 7) {
               if (!admin) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak bisa dibuka ${groupName} tautan grup karena bot bukan admin.`), m)
               client.groupSettingUpdate(jid, 'not_announcement').then(() => {
                  client.reply(jid, Func.texted('bold', `🚩 Grup telah dibuka.`)).then(() => {
                     client.reply(m.chat, Func.texted('bold', `🚩 Berhasil dibuka ${groupName} group.`), m)
                  })
               })
            } else if (dial == 8) {
               let set = global.db.groups.find(v => v.jid == jid)
               let time = set.stay ? 'FOREVER' : (set.expired == 0 ? 'NOT SET' : Func.timeReverse(set.expired - new Date() * 1))
               let member = groupMetadata.participants.map(u => u.id).length
               let pic = await client.profilePictureUrl(jid, 'image')
               let data = {
                  name: groupName,
                  member,
                  time,
                  set,
                  admin
               }
               return client.sendMessageModify(m.chat, steal(data) + '\n\n' + global.footer, m, {
                  largeThumb: true,
                  thumbnail: await Func.fetchBuffer(pic)
               })
            } else if (dial == 9) {
               global.db.groups.find(v => v.jid == jid).expired = 0
               global.db.groups.find(v => v.jid == jid).stay = false
               client.reply(m.chat, Func.texted('bold', `🚩 Durasi bot di ${groupName} grup telah berhasil diatur ulang.`), m)
            }
         }
      } catch (e) {
         console.log(e)
      }
   },
   owner: true,
   cache: true,
   location: __filename
}

const steal = (data) => {
   return `乂  *S T E A L E R*

	◦  *Name* : ${data.name}
	◦  *Member* : ${data.member}
	◦  *Expired* : ${data.time}
	◦  *Status* : ${Func.switcher(data.set.mute, 'OFF', 'ON')}
	◦  *Bot Admin* : ${Func.switcher(data.admin, '√', '×')}`
}