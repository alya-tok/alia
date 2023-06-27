exports.run = {
   usage: ['premium'],
   category: 'special',
   async: async (m, {
      client,
      isPrefix
   }) => {
      client.reply(m.chat, `🏷️ Upgrade ke paket premium hanya Rp. 10.000,- untuk mendapatkan limit 1K selama 1 bulan.\in\Jika ingin membeli hubungi *${isPrefix}owner*`, m)
   },
   error: false,
   cache: true,
   location: __filename
}