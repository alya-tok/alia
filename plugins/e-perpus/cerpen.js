const category = ['anak', 'jawa', 'sunda', 'budaya', 'cinta', 'galau', 'gokil', 'inspiratif', 'jepang', 'kehidupan', 'keluarga', 'korea', 'kristen', 'liburan', 'lingkungan', 'malaysia', 'mengharukan', 'misteri', 'motivasi', 'nasihat', 'nasionalisme', 'olahraga', 'penantian', 'pendidikan', 'pengorbanan', 'penyesalan', 'perjuangan', 'perpisahan', 'persahabatan', 'petualangan', 'ramadhan', 'remaja', 'renungan', 'rindu', 'rohani', 'romantis', 'sastra', 'sedih', 'sejarah', 'terjemahan']
exports.run = {
   usage: category.map(v => `cerpen-${v}`),
   category: 'e - perpus',
   async: async (m, {
      client,
      command
   }) => {
      try {
        // if (!command.split('-')[1].trim().includes(category)) return m.reply('🚩 *Kategori tidak ada.*')
         client.sendReact(m.chat, '🕒', m.key)
         const json = await Func.fetchJson(API('alya', '/api/ceritapendek', { q: command.split('-')[1].trim() }, 'apikey'))
         if (!json.status) return m.reply(Func.jsonFormat(json))
         let text = `*${json.title.toUpperCase()}*\n`
         text += `by ${json.author}\n\n`
         text += json.cerita
         client.reply(m.chat, text, m)
      } catch (e) {
         client.reply(m.chat, Func.jsonFormat(e), m)
      }
   },
   error: false,
   limit: true
}