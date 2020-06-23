import Mock from 'mockjs'

interface List {
  id: number
  name: string
  address: string
  sex: number
  job: string
}

let list: List[] = []
const count = 200
for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    address: Mock.mock('@county(true)'),
    'birth|315504000000-946656000000': 1,
    sex: Mock.Random.integer(0, 1),
    'job|1': [ 'designer', 'programmer', 'testers', 'product' ] // 从字符串数组中随机选择一个数
  }))
}
export {
  list
}
