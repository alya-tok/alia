exports.run = {
  usage: ['owner'],
  category: 'miscs',
  async: async (m, {
    client,
    env,
    Func
  }) => {
    client.sendContact(m.chat, [{
      name: env.owner_name,
      number: env.owner,
      about: 'Customer Support'
    }], m, {
      org: 'alia',
      website: 'https://api.alyachan.pro',
      email: 'contact@alyachan.pro'
    })
  },
  error: false,
  cache: true,
  location: __filename
}