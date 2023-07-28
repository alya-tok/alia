exports.run = {
   usage: ['podcast'],
   use: 'link',
   category: 'downloader',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (!args || !args[0]) return client.reply(m.chat, Func.example(isPrefix, command, 'https://podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy9jYjQ0OGM0L3BvZGNhc3QvcnNz/episode/MjhjODNkYzUtMGVhNi00MWEwLTk0YWMtYzhmZjBkOWNkYTM1?sa=X&ved=0CAUQkfYCahcKEwj4pdqlhYT5AhUAAAAAHQAAAAAQLA'), m)
         if (!args[0].match(/^(?:https?:\/\/)?(?:podcasts\.)?(?:google\.com\/)(?:feed\/)(?:\S+)?$/)) return client.reply(m.chat, global.status.invalid, m)
         client.sendReact(m.chat, '🕒', m.key)
         let json = await Func.fetchJson(API('alya', '/api/podcast', { url: args[0] }, 'apikey'))
         if (!json.status) return client.reply(m.chat, Func.jsonFormat(json), m)
         client.sendFile(m.chat, json.data.url, json.data.title + '.mp3', '', m, {
               document: true
            })
      } catch {
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   cache: true,
   location: __filename
}