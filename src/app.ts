import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import KoaStatic from 'koa-static'
import path from 'path'

const app = new Koa()
import router from './routes/index'

const staticPath = './static'
console.log(__dirname)
app.use(KoaStatic(
  path.join(__dirname, staticPath)
))
app.use(koaBodyParser())
app.use(router())
app.listen(3000)

