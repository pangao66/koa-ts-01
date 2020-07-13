import getSecuritySign from './index.umd'
import { _guid } from './utils'

console.log(_guid)
export const commonParams = {
  g_tk: 1928093487,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'json'
}
export const topBannerParams = {
  ...commonParams,
  platform: 'yqq.json',
  hostUin: 0,
  needNewCode: 0,
  '-': 'recom' + (Math.random() + '').replace('0.', ''),
  data: {
    'comm': {'ct': 24},
    'category': {'method': 'get_hot_category', 'param': {'qq': ''}, 'module': 'music.web_category_svr'},
    'recomPlaylist': {
      'method': 'get_hot_recommend',
      'param': {'async': 1, 'cmd': 2},
      'module': 'playlist.HotRecommendServer'
    },
    'playlist': {
      'method': 'get_playlist_by_category',
      'param': {'id': 8, 'curPage': 1, 'size': 40, 'order': 5, 'titleid': 8},
      'module': 'playlist.PlayListPlazaServer'
    },
    'new_song': {'module': 'newsong.NewSongServer', 'method': 'get_new_song_info', 'param': {'type': 5}},
    'new_album': {
      'module': 'newalbum.NewAlbumServer',
      'method': 'get_new_album_info',
      'param': {'area': 1, 'sin': 0, 'num': 10}
    },
    'new_album_tag': {'module': 'newalbum.NewAlbumServer', 'method': 'get_new_album_area', 'param': {}},
    'toplist': {'module': 'musicToplist.ToplistInfoServer', 'method': 'GetAll', 'param': {}},
    'focus': {'module': 'QQMusic.MusichallServer', 'method': 'GetFocus', 'param': {}}
  }
}
export const discListParams = {
  ...commonParams,
  platform: 'yqq',
  hostUin: 0,
  sin: 0,
  ein: 29,
  sortId: 5,
  needNewCode: 0,
  categoryId: 10000000,
  rnd: Math.random(),
  // format: 'json'
}
export const singerListParams = {
  g_kt: 5381,
  '-': 'getUCGI20144452544527724',
  sign: 'zza87en3es7ng2f3fef04bda3a286eeb40136f6b80f4a',
  loginUin: 0,
  hostUin: 0,
  format: 'json',
  inCharset: 'utf8',
  outCharset: 'utf-8',
  notice: 0,
  platform: 'yqq.json',
  needNewCode: 0,
  data: {
    'comm': {'ct': 24, 'cv': 0},
    'singerList': {
      'module': 'Music.SingerListServer',
      'method': 'get_singer_list',
      'param': {
        'area': -100, 'sex': -100, 'genre': -100, 'index': -100, 'sin': 0,
        'cur_page': 1
      }
    }
  }

}
export const getSingerSongs = (id: string) => {
  const data = {
    "comm": {
      "ct": 24,
      "cv": 0
    },
    "singerSongList": {
      "method": "GetSingerSongList",
      "param": {
        "order": 1,
        "singerMid": id,
        // "singerMid": '001BLpXF2DyJe2',
        "begin": 0,
        "num": 100
      },
      "module": "musichall.song_list_server"
    }
  }
  const sign = getSecuritySign(JSON.stringify(data))
  console.log(sign)
  return {
    // '-': 'getSingerSong2764990814715609',
    '-': "getSingerSong" + (Math.random() + "").replace("0.", ""),
    g_tk: 5381,
    // sign: 'zza9uw3jnbajz9y3wt27259b46505c87204be2a320c5b177452',
    sign,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data
  }
}
export const getSongUrl = (songmid: string[]) => {
  const guid = _guid ? _guid + '' : '1429839143'
  const data = {
    "req": {
      "module": "CDN.SrfCdnDispatchServer",
      "method": "GetCdnDispatch",
      "param": {"guid": guid, "calltype": 0, "userip": ""}
    },
    "req_0": {
      "module": "vkey.GetVkeyServer",
      "method": "CgiGetVkey",
      "param": {
        "guid": guid,
        // "songmid": ["000lv3Zi13dSVA"],
        "songmid": [...songmid],
        "songtype": [0],
        "uin": "",
        "loginflag": 1,
        "platform": "20"
      }
    },
    "comm": {
      "uin": '',
      "format": "json", "ct": 24, "cv": 0
    }
  }
  const sign = getSecuritySign(JSON.stringify(data))
  // console.log(sign)
  return {
    '-': 'getplaysongvkey' + (Math.random() + "").replace("0.", ""),
    g_tk: 1515329588,
    // sign: 'zza27rw206bn186f9aca67d341db206149bb757920d589b',
    sign,
    // loginUin: 243911007
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0,
    data
  }
}
export const getHotSingerList = () => {
  const data = {
    "req_0": {
      "module": "musichall.singerlistserver",
      "method": "GetBatchSingers",
      "param": {"area": -100, "sex": -100, "genre": -100, "hastag": 1, "begin": 0, "num": 200}
    },
    "req_1": {"module": "musichall.singerlistserver", "method": "OftenListenSinger", "param": {"maxNum": 12}},
    "comm": {"g_tk": 5381, "uin": 0, "format": "json", "platform": "h5", "ct": 23, "cv": 0}
  }
  return {
    data,
    sign: getSecuritySign(JSON.stringify(data)),
    '_': (Math.random() + "").replace("0.", "")
  }
}
export const getIndexSingerData = () => {
  const data = {
    "req_0": {
      "module": "musichall.singerlistserver",
      "method": "GetBatchSingers",
      "param": {"area": -100, "sex": -100, "genre": -100, "hastag": 1, "begin": 200, "num": 800}
    }, "comm": {"g_tk": 5381, "uin": 0, "format": "json", "platform": "h5", "ct": 23, "cv": 0}
  }
  return {
    data,
    sign: getSecuritySign(JSON.stringify(data)),
    '_': (Math.random() + "").replace("0.", "")
  }
}
export const lyricConfig = (id: string) => {
  return {
    '-': 'MusicJsonCallback_lrc',
    pcachetime: +new Date(),
    songmid: id,
    g_tk_new_20200303: 1313868759,
    g_tk: 1313868759,
    hostUin: 0,
    format: 'json',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq.json',
    needNewCode: 0
  }
}
