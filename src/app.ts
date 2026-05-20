import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import KoaStatic from 'koa-static'
import path from 'path'
import router from './routes/index'

const app = new Koa()

const staticPath = './static'
app.use(KoaStatic(
  path.join(__dirname, staticPath)
))
app.use(koaBodyParser())
app.use(router())
app.listen(3000, () => {
  console.log('服务已启动: http://localhost:3000')
  console.log('示例页面: http://localhost:3000/demo.html')
})
