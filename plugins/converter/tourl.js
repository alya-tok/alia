exports.run = {
   usage: ['upload'],
   hidden: ['tourl'],
   use: 'reply photo or video',
   category: 'converter',
   async: async (m, {
      client,
      isPrefix,
      command
   }) => {           
  try {
  if (m.quoted ? m.quoted.message : m.msg.viewOnce) {
  let type = m.quoted ? Object.keys(m.quoted.message)[0] : m.mtype
  let q = m.quoted ? m.quoted.message[type] : m.msg
  if (/document/i.test(q.mtype)) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak dapat mengonversi file dokumen ke url.`), m)
  if (/image|video/.test(type)) {
  let filesize = typeof q.fileLength == 'undefined' ? q.msg.fileLength.low : q.fileLength.low
  let chSize = Func.sizeLimit(await Func.getSize(filesize), 10)
  if (chSize.oversize) return client.reply(m.chat, Func.texted('bold', `🚩 Ukuran file tidak boleh lebih dari 10 MB.`), m)
  client.sendReact(m.chat, '🕒', m.key)
  let img = await client.downloadMediaMessage(q)
  let json = await scrap.uploadImage(img)
  if (!json.status) return client.reply(m.chat, global.status.fail, m)
  client.reply(m.chat, Func.jsonFormat(json), m)
  } else client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk video dan gambar.`), m)
  } else {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (/document/i.test(q.mtype)) return client.reply(m.chat, Func.texted('bold', `🚩 Tidak dapat mengonversi file dokumen ke url.`), m)
  if (!/video|image/.test(mime)) return client.reply(m.chat, Func.texted('bold', `🚩 Hanya untuk video dan gambar.`), m)
  let filesize = typeof q.fileLength == 'undefined' ? q.msg.fileLength.low : q.fileLength.low
  let chSize = Func.sizeLimit(await Func.getSize(filesize), 10)
  if (chSize.oversize) return client.reply(m.chat, Func.texted('bold', `🚩 Ukuran file tidak boleh lebih dari 10 MB.`), m)
  client.sendReact(m.chat, '🕒', m.key)
  let media = await q.download()
  let link = await scrap.uploadImage(media)
  client.reply(m.chat, Func.jsonFormat(link), m)
  }
  } catch (e) {
    return client.reply(m.chat, Func.jsonFormat(e), m)
   }
   },
   error: false,
   limit: true
}