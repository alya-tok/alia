exports.run = {
  usage: ['waifudiff'],
  use: 'red head',
  category: 'utilities',
  async: async (m, {
    client,
    isPrefix,
    command,
    text,
    Func,
    Scraper
  }) => {
    try {
      if (!text) return m.reply(Func.example(isPrefix, command, 'Red head'))
      let old = new Date()
      client.sendReact(m.chat, '🕐', m.key)
      const json = await Func.fetchJson(API('alya', '/api/waifu-diffusion', {
        prompt: text
      }, 'apikey'))
      if (!json.status) return m.reply(Func.jsonFormat(json))
      let p = `乂  *W A I F U - D I F F U S I O N*\n\n`
      p += `◦  *Image Size* : ${json.data.image_size}\n`
      p += `◦  *Step* : ${json.data.steps}\n`
      p += `◦  *Sampler* : ${json.data.sampler}\n`
      p += `◦  *Cfg Scale* : ${json.data.cfg_scale}\n`
      p += `◦  *Seed* : ${json.data.seed}\n`
      p += `◦  *Model* : ${json.data.model}\n`
      p += `◦  *Batch Size* : ${json.data.batch_size}\n`
      p += `◦  *Batch Post* : ${json.data.batch_pos}\n`
      p += `◦  *Clip Skip* : ${json.data.clip_skip}\n`
      p += `◦  *Date* : ${json.data.date}\n`
      p += `◦  *Impression* : ${json.data.impressions}\n`
      p += `◦  *View* : ${json.data.view}\n`
      p += `◦  *Fetching* : ${((new Date - old) * 1)} ms\n`
      p += `◦  *Prompt* : ${json.data.prompt}\n\n`
      p += global.footer
      client.sendFile(m.chat, json.data.url, '', p, m)
    } catch (e) {
      console.log(e)
      m.reply(Func.jsonFormat(e))
    }
  },
  limit: true,
  cache: true,
  location: __filename
}
