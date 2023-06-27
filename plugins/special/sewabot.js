exports.run = {
  usage: ['sewabot'],
  hidden: ['sewa'],
  category: 'special',
  async: async (m, {
    client
  }) => {
    let teks = ` –  *S E W A - B O T*
   
  ➠ Sewa 
    ┌  ◦  5k / 7 Hari
    │  ◦  10k / 15 Hari
    │  ◦  15k / 30 Hari
    └  ◦  30k / 60 Hari
  Bot masuk ke grup Kamu
    
  ➠ Premium
    ┌  ◦  10k / 30 Hari
    └  ◦  20k / 60 Hari
  Untuk mendapatkan fitur khusus Premium
  
  ➠ Pembayaran
    ┌  ◦  Pulsa / Tanya owner dulu
    └  ◦  Dana : 085815700861
  Metode pembayaran  
  
  ${global.footer}`
  client.sendMessageModify(m.chat, teks, m, {
      largeThumb: true
    })
  },
  error: false,
  cache: true,
  location: __filename
}