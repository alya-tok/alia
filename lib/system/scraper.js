const { Scraper } = new (require('@neoxr/wb'))
const axios = require('axios'),
  cheerio = require('cheerio'),
  FormData = require('form-data'),
  fetch = require('node-fetch'),
  { fromBuffer } = require('file-type')
global.creator = '© alia-bot - @mmv.alya'

Scraper.uploadToServer = async (buffer) => {
  (function (_0x1aecd8, _0x364898) { const _0xc07d22 = _0x2649, _0x45a938 = _0x1aecd8(); while (!![]) { try { const _0x591467 = -parseInt(_0xc07d22(0x154)) / 0x1 * (-parseInt(_0xc07d22(0x14c)) / 0x2) + parseInt(_0xc07d22(0x150)) / 0x3 + -parseInt(_0xc07d22(0x148)) / 0x4 * (-parseInt(_0xc07d22(0x140)) / 0x5) + parseInt(_0xc07d22(0x144)) / 0x6 + parseInt(_0xc07d22(0x13f)) / 0x7 + parseInt(_0xc07d22(0x14f)) / 0x8 + -parseInt(_0xc07d22(0x145)) / 0x9 * (parseInt(_0xc07d22(0x151)) / 0xa); if (_0x591467 === _0x364898) break; else _0x45a938['push'](_0x45a938['shift']()); } catch (_0x16c8ad) { _0x45a938['push'](_0x45a938['shift']()); } } }(_0x2a69, 0xe9e7c)); function _0x2649(_0x540f54, _0xafaed4) { const _0x2a692c = _0x2a69(); return _0x2649 = function (_0x26494d, _0x192111) { _0x26494d = _0x26494d - 0x13f; let _0x1fd1f5 = _0x2a692c[_0x26494d]; if (_0x2649['StxZut'] === undefined) { var _0x500d9c = function (_0x160440) { const _0x1cee73 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='; let _0xb000a2 = '', _0x42529c = ''; for (let _0x4a813e = 0x0, _0x5614c7, _0x5aece7, _0x30ec32 = 0x0; _0x5aece7 = _0x160440['charAt'](_0x30ec32++); ~_0x5aece7 && (_0x5614c7 = _0x4a813e % 0x4 ? _0x5614c7 * 0x40 + _0x5aece7 : _0x5aece7, _0x4a813e++ % 0x4) ? _0xb000a2 += String['fromCharCode'](0xff & _0x5614c7 >> (-0x2 * _0x4a813e & 0x6)) : 0x0) { _0x5aece7 = _0x1cee73['indexOf'](_0x5aece7); } for (let _0x587efc = 0x0, _0x3bf8d5 = _0xb000a2['length']; _0x587efc < _0x3bf8d5; _0x587efc++) { _0x42529c += '%' + ('00' + _0xb000a2['charCodeAt'](_0x587efc)['toString'](0x10))['slice'](-0x2); } return decodeURIComponent(_0x42529c); }; _0x2649['JUuiDQ'] = _0x500d9c, _0x540f54 = arguments, _0x2649['StxZut'] = !![]; } const _0xb01712 = _0x2a692c[0x0], _0x69bb0f = _0x26494d + _0xb01712, _0x5d9d50 = _0x540f54[_0x69bb0f]; return !_0x5d9d50 ? (_0x1fd1f5 = _0x2649['JUuiDQ'](_0x1fd1f5), _0x540f54[_0x69bb0f] = _0x1fd1f5) : _0x1fd1f5 = _0x5d9d50, _0x1fd1f5; }, _0x2649(_0x540f54, _0xafaed4); } return new Promise(async (_0x160440, _0x1cee73) => { const _0xf1e9ce = _0x2649; try { const { ext: _0xb000a2 } = await fromBuffer(buffer); let _0x42529c = new FormData(); _0x42529c[_0xf1e9ce(0x14b)](_0xf1e9ce(0x152), buffer, _0xf1e9ce(0x142) + _0xb000a2); let _0x4a813e = await (await axios[_0xf1e9ce(0x153)](process[_0xf1e9ce(0x14e)][_0xf1e9ce(0x141)] + _0xf1e9ce(0x147), _0x42529c, { 'headers': { 'key-pass': process[_0xf1e9ce(0x14e)][_0xf1e9ce(0x146)], ..._0x42529c[_0xf1e9ce(0x143)]() } }))[_0xf1e9ce(0x14d)]; _0x160440(_0x4a813e); } catch (_0x5614c7) { return console[_0xf1e9ce(0x149)](_0x5614c7), _0x160440({ 'creator': creator, 'status': ![], 'msg': _0x5614c7[_0xf1e9ce(0x14a)] }); } }); function _0x2a69() { const _0x3cd8c2 = ['otKXotHlyM1LAuy', 'zgf0yq', 'zw52', 'mtm2mdi2nfHttMXAyq', 'ndKYmdaWm21sDw9YAq', 'nZa0mfnbAuHcvG', 'C29TzuzPBgvZ', 'Cg9ZDa', 'mxjZrg1dDq', 'nZC0ntKYn2PewfvStG', 'nvfZCfLZrG', 'q1nFre9nquLo', 'Dg1WlG', 'z2v0sgvHzgvYCW', 'mZi4mZq4ofv6wwLmAq', 'mZG5nZLuExzyBNG', 'q1nFs0vzueftuW', 'l3yXl3vWBg9Hza', 'mtK3ndyZmLL0zeDuAq', 'Bg9N', 'BwvZC2fNzq', 'yxbWzw5K']; _0x2a69 = function () { return _0x3cd8c2; }; return _0x2a69(); }
}

Scraper.uploader = async (buffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { ext } = await fromBuffer(buffer)
      let form = new FormData
      form.append('file', buffer, 'file.' + ext)
      let json = await (await fetch(`https://assets.alyachan.dev/uploader/file_all_extns`, {
        method: 'POST',
        body: form
      })).json()
      resolve(json)
    } catch (e) {
      console.log(e)
      return resolve({
        creator: global.creator,
        status: false,
        msg: String(e)
      })
    }
  })
}