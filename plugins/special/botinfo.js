exports.run = {
   usage: ['tnc', 'script'],
   hidden: ['sc'],
   category: 'special',
   async: async (m, {
      client,
      args,
      command
   }) => {
      if (command == 'script' || command == 'sc') return client.reply(m.chat, info(), m)
      if (command == 'tnc') return client.sendMessageModify(m.chat, tnc(), m, {
         largeThumb: true
      })
   },
   error: false,
   cache: true,
   location: __filename
}

let info = () => {
   return `Bot ini dibuat dan dikembangkan dengan tujuan *belajar*.
   
Source :
- https://github.com/neoxr/neoxr-bot

65% data yang dikirim dari bot ini berasal dari Rest API: https://api.neoxr.my.id`
}

const tnc = () => {
   return `➠ Data pengguna, grup, dan obrolan akan dihapus secara otomatis jika tidak ada aktivitas yang terdeteksi selama 7 hari (alasan: pembersihan basis data).

➠ Pengguna gratis mendapatkan ${global.limit} / hari dan akan direset setelah 12 jam

➠ Jangan spam, jeda setiap penggunaan perintah selama ${global.cooldown} detik.

➠ Jangan melakukan panggilan suara atau video (Telepon & Video Call), jika Anda melakukannya akan diblokir.

➠ Jangan toxic bot karena kalian akan mendapatkan sanksi berupa banned dan block.

➠ Jangan mencari & membuat konten dewasa (+18), misal: membuat stiker dari foto bugil atau mencari desahan ASMR.

➠ Jika ingin membuka blokir dan unbanned, masing-masing akan dikenakan biaya sebesar Rp. 5.000,-

➠ Spammer akan secara permanen dibanned untuk pengguna gratis dan premium (+ tidak ada pengembalian uang).

➠ Semua Syarat & Ketentuan dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya.`
}