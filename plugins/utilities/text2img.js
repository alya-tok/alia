exports.run = {
  usage: ['txt2img'],
  hidden: ['text2image', 'text2img'],
  use: 'query',
  category: 'utilities',
  async: async (m, {
    client,
    text,
    isPrefix,
    command,
    Func
  }) => {
    try {
      if (!text) return client.reply(m.chat, Func.example(isPrefix, command, `closeup portrait of 1 pure young girl, standing by a river in the spring season with flowers, pale kin, under god rays, windblown long grey wavy hair, perfect, detailed face, exact proportoin, soft cinematic lighting, muted colors, hyperrealistic, 8k, octane render,`), m)
      client.sendReact(m.chat, '🕐', m.key)
      let json = await Func.fetchJson(API('alya', '/api/text2img', {
        text: text
      }, 'apikey'))
      if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
      let teks = `◦  *ID* : ${json.data.id}\n`
      teks += `◦  *Width* : ${json.data.width}\n`
      teks += `◦  *Height* : ${json.data.height}\n`
      teks += `◦  *Seed* : ${json.data.seed}\n`
      teks += `◦  *Inference steps* : ${json.data.inference_steps}\n`
      teks += `◦  *Guidance scale* : ${json.data.guidance_scale}\n`
      teks += `◦  *Is Public* : ${json.data.is_public}\n`
      teks += `◦  *Sampler* : ${json.data.sampler}\n`
      teks += `◦  *Submitted* : ${json.data.submitted}\n`
      teks += `◦  *Model* : ${json.data.model}\n`
      teks += `◦  *Number* : ${json.data.nunber_imgs}\n`
      teks += `◦  *Created At* : ${json.data.createdAt}\n`
      teks += `◦  *Updated At* : ${json.data.updatedAt}\n`
      teks += `◦  *Model Id* : ${json.data.model_id}\n`
      teks += `◦  *Scheduler Id* : ${json.data.scheduler_id}\n`
      teks += `◦  *Prompt Id* : ${json.data.prompt_id}\n`
      teks += `◦  *Negative Prompt Id* : ${json.data.negative_prompt_id}\n`
      teks += `◦  *Prompt* : ${json.data.prompt}\n`
      teks += `◦  *Negative Prompt* : ${json.data.negative_prompt}\n`
      client.sendProgress(m.chat, teks, m)
        await Func.delay(10000)
        await client.sendFile(m.chat, json.data.images.url, '', ``, null)
    } catch (e) {
      m.reply(Func.jsonFormat(e))
      return client.reply(m.chat, global.status.error, m)
    }
  },
  error: false,
  limit: true,
  restrict: true,
  location: __filename
}
