exports.run = {
  usage: ['wame'],
  category: 'group',
  async: async (m, {
    client,
    text,
    Func
  }) => {
    let number = m.quoted ? (m.quoted.sender).split`@`[0] : (m.sender).split`@`[0]
    let chat = text ? text : 'hai'
    client.reply(m.chat, `https://wa.me/${number}?text=${encodeURI(chat)}`, m)
  },
  error: false
}