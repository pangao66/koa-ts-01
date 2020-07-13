import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'

const app = new Koa()
import router from './routes/index'

app.use(koaBodyParser())
app.use(router())
app.listen(3000)
