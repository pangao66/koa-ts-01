import Router from 'koa-router'
import Mock from "mockjs";
import {getMockUserList} from "./methods";

const commonBody = {
  code: 10000,
  message: '操作成功',
}
const admin = new Router()
admin.prefix('/api/admin')
admin.post('/search-list', async (ctx) => {
  const {list, total} = await getMockUserList(ctx.request.body)
  ctx.body = {
    ...commonBody,
    data: {
      list: list,
      total: total
    },
  }
})
admin.post('/add-user', async (ctx) => {

})
export default admin
