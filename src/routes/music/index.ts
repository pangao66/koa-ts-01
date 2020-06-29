import Router from 'koa-router'
import axios from 'axios'
import { discListParams, getSingerSongs, getSongUrl, singerListParams, topBannerParams } from './config'
import { TopBannerContent } from './types'
import { singerlist } from "./singerList"

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
music.get('/getSingerList', async ctx => {
  const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musics.fcg', {
    params: singerListParams,
    headers: {
      origin: 'https://y.qq.com',
      referer: 'https://y.qq.com/portal/singer_list.html',
    }
  })
  const singerList1 = data?.singerList?.data?.singerlist ?? []
  const singerList2 = singerlist
  ctx.body = {
    code: 10000,
    data: {
      hot: singerList1,
      common: singerList2
    },
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
  ctx.body = data.singerSongList.data
})
music.get('/getSongUrl', async ctx => {
  const songmid: string = ctx.query.id
  const {data} = await axios.get('https://u.y.qq.com/cgi-bin/musics.fcg', {
    params: getSongUrl(songmid)
  })
  ctx.body = data
})
export default music
