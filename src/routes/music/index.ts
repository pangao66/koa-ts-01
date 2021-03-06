import Router from 'koa-router'
import axios from 'axios'
import {
  discListParams,
  getHotSingerList,
  getIndexSingerData,
  getSingerSongs,
  getSongUrl, lyricConfig, songInfoConfig,
  topBannerParams
} from './config'
import { TopBannerContent } from './types'

const music = new Router()
music.prefix('/api/music')
music.get('/getTopBanner', async ctx => {
  const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musicu.fcg', {params: topBannerParams})
  const jumpPrefixMap = {
    10002: 'https://y.qq.com/n/yqq/album/',
    10014: 'https://y.qq.com/n/yqq/playlist/',
    10012: 'https://y.qq.com/n/yqq/mv/v/'
  }
  if (data.code === 0) {
    const slider = []
    const content = data.focus.data && data.focus.data.content as TopBannerContent[]
    if (content) {
      for (let i = 0; i < content.length; i++) {
        const item = content[i]
        const sliderItem = {} as { id: number, linkUrl: string, picUrl: string }
        const jumpPrefix = jumpPrefixMap[item.type || 10002]
        sliderItem.id = item.id
        sliderItem.linkUrl = `${jumpPrefix}${item.jump_info.url}.html'`
        sliderItem.picUrl = item.pic_info.url
        slider.push(sliderItem)
      }
    }
    ctx.body = {
      data: slider,
      success: true
    }
  }
})
music.get('/getDiscList', async ctx => {
  const {data} = await axios.get('https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
    params: discListParams,
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    }
  })
  ctx.body = data
})
// music.get('/getSingerList', async ctx => {
//   const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musics.fcg', {
//     params: singerListParams,
//     headers: {
//       origin: 'https://y.qq.com',
//       referer: 'https://y.qq.com/portal/singer_list.html',
//     }
//   })
//   const singerList1 = data?.singerList?.data?.singerlist ?? []
//   const singerList2 = singerlist
//   ctx.body = {
//     code: 10000,
//     data: {
//       hot: singerList1,
//       common: singerList2
//     },
//   }
// })
music.get('/getHotSingerList', async ctx => {
  const {data, sign, _} = getHotSingerList()
  const res = await axios.post('https://u.y.qq.com/cgi-bin/musics.fcg', data, {
    params: {
      sign, _
    },
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/m/client/singer_home/index.html?_video=1&_hdso=1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'com.tencent.qqmusic',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      // Cookie: guid=000000007d5c2e5c000000000033c587; ct=11; cv=9170005; sim_uuid=d20110169036d564
    }
  })
  ctx.body = {
    success: true,
    data: res.data?.req_0?.data?.singerlist || []
  }
  console.log(res)
})
music.get('/getSingerList', async ctx => {
  const {data, sign, _} = getIndexSingerData()
  const res = await axios.post('https://u.y.qq.com/cgi-bin/musics.fcg', data, {
    params: {
      sign, _
    },
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/m/client/singer_home/index.html?_video=1&_hdso=1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Requested-With': 'com.tencent.qqmusic',
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      // Cookie: guid=000000007d5c2e5c000000000033c587; ct=11; cv=9170005; sim_uuid=d20110169036d564
    }
  })
  ctx.body = {
    success: true,
    data: res.data.req_0?.data?.singerlist || []
  }
})
music.get('/getSingerDetail', async ctx => {
  console.log('进来了')
  const singerId = ctx.query.id
  console.log(singerId)
  const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musics.fcg', {
    params: getSingerSongs(singerId)
  })
  console.log(data)
  ctx.body = {
    success: true,
    data: data.singerSongList.data
  }
})
music.post('/getSongUrl', async ctx => {
  const songmid: string[] = ctx.request.body.songMids
  const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musics.fcg', {
    params: getSongUrl(songmid)
  })
  console.log(data)
  ctx.body = {
    success: true,
    data: data
  }
})
music.get('/getLyric', async ctx => {
  const id = ctx.query.id
  const {data} = await axios.get('https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
    {
      params: lyricConfig(id),
      headers: {
        origin: 'https://y.qq.com',
        referer: 'https://y.qq.com/portal/player.html'
      }
    })
  ctx.body = {
    success: true,
    data: data?.lyric
  }
})
music.get('/getHotKey', async ctx => {
  const {data} = await axios.get('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?', {
    params: {
      g_tk_new_20200303: 5381,
      g_tk: 5381,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0,
    },
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/',
    }
  })
  ctx.body = {
    success: true,
    data: data.data
  }

})
music.get('/search', async ctx => {
  const keywords = ctx.query.keywords
  const {data} = await axios.get('https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg', {
    params: {
      is_xml: 0,
      key: keywords,
      g_tk_new_20200303: 5381,
      g_tk: 5381,
      hostUin: 0,
      format: 'json',
      inCharset: 'utf8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'yqq.json',
      needNewCode: 0
    },
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/',
    }
  })
  ctx.body = {
    success: true,
    data: data.data
  }
})
music.get('/getSongInfo', async ctx => {
  const {song_mid, song_id} = ctx.query
  const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musicu.fcg', {
    params: songInfoConfig({song_mid, song_id})
  })
  console.log(data)
  ctx.body = {
    success: true,
    data: data?.songinfo?.data?.track_info
  }
})
export default music
