import Koa from 'koa'

const app = new Koa()
import router from './routes/index'

app.use(router())
app.listen(3000)
