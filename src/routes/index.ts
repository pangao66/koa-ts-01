import Router from 'koa-router'

const router = new Router()

// GET 接口 - 获取问候信息
router.get('/api/hello', async (ctx) => {
  ctx.body = {
    code: 200,
    message: '请求成功',
    data: {
      greeting: '你好，欢迎使用 Koa + TypeScript！',
      timestamp: new Date().toISOString()
    }
  }
})

// POST 接口 - 接收并返回消息
router.post('/api/message', async (ctx) => {
  const { name, content } = ctx.request.body as { name: string; content: string }

  if (!name || !content) {
    ctx.body = {
      code: 400,
      message: '参数缺失，请提供 name 和 content',
      data: null
    }
    return
  }

  ctx.body = {
    code: 200,
    message: '消息发送成功',
    data: {
      reply: `收到来自「${name}」的消息：${content}`,
      receivedAt: new Date().toISOString()
    }
  }
})

export default router
