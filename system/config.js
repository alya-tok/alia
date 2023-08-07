const { Function, Scraper } = new (require('@neoxr/neoxr-js'))
//Apikey system
global.APIs = {
alya: 'https://api.alyachan.biz.id', // website api entire bot feature
apikey: 'YOUR_KEY' // fill with your apikey, don't have apikey? registered https://api.alyachan.online/login
}
// Owner number
global.owner = '6285815700861'
// Owner name
global.owner_name = 'Alya uhuy'
// Database name (Default: database)
global.database = 'database'
// Maximum upload file size limit (Default : 100 MB)
global.max_upload = 50
// Delay for spamming protection (Default : 3 seconds)
global.cooldown = 3
// User Limitation (Default : 25)
global.limit = 20
// Time to be temporarily banned and others (Default : 30 minutes)
global.timer = 1800000
// Symbols that are excluded when adding a prefix (Don't change it)
global.evaluate_chars = ['=>', '~>', '<', '>', '$']
// Country code that will be automatically blocked by the system, when sending messages in private chat
global.blocks = ['91', '92', '94', '212']
// Put target jid to forward friends story
global.forwards = global.owner + '@c.us'
// Timezone (Default : Asia/Jakarta)
global.timezone = 'Asia/Jakarta'
// Bot version
global.version = '3.3.0',
// Bot name
global.botname = `© alya-bot v${global.version} (Public Bot)`
// Footer text
global.footer = 'ꜱɪᴍᴘʟᴇ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ ᴍᴀᴅᴇ ʙʏ ᴀʟʏᴀ ッ'
// Scraper
global.scrap = Scraper
// Function
global.Func = Function
// Global status
global.status = Object.freeze({
   wait: Func.texted('bold', 'Processed . . .'),
   invalid: Func.texted('bold', 'URL is Invalid!'),
   wrong: Func.texted('bold', 'Wrong format!'),
   getdata: Func.texted('bold', 'Scraping metadata . . .'),
   fail: Func.texted('bold', 'Can\'t get metadata!'),
   error: Func.texted('bold', 'Error occurred!'),
   errorF: Func.texted('bold', 'Sorry this feature is in error.'),
   premium: Func.texted('bold', 'This feature only for premium user.'),
   owner: Func.texted('bold', 'This command only for owner.'),
   god: Func.texted('bold', 'This command only for Master'),
   group: Func.texted('bold', 'This command will only work in groups.'),
   botAdmin: Func.texted('bold', 'This command will work when I become an admin.'),
   admin: Func.texted('bold', 'This command only for group admin.'),
   private: Func.texted('bold', 'Use this command in private chat.')
})
