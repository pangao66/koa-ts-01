import Router from 'koa-router'
import Mock from "mockjs";

const commonBody = {
  code: 10000,
  message: '操作成功',
}
const admin = new Router()
const mockPeople = Mock.mock({
  'peoples|5000': [{
    'id|+1': 1,
    'guid': '@guid',
    'name': '@cname',
    'age': '@integer(20, 50)',
    'birthday': '@date("MM-dd")',
    'address': '@county(true)',
    'email': '@email',
    sex: Mock.Random.integer(0, 1),
    'job|1': ['designer', 'web', 'java', 'testers', 'product'] // 从字符串数组中随机选择
  }]
});
admin.prefix('/api/admin')
admin.post('/search-list', async (ctx) => {
  ctx.body = {
    ...commonBody,
    data: mockPeople.peoples,
  }
})
export default admin
