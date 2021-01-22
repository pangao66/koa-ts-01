import {list} from '../../mock'
import Mock from 'mockjs'
export async function getMockUserList(data: any): Promise<{ list: any[], total: number }> {
  const {currentPage = 1, pageSize = 10, ...query} = data;
  let List = [...list.peoples]
  for (let i in query) {
    if (!(query[i] === '' || query[i] === 'undefined' || query[i] == null)) {
      List = List.filter((item) => {
        // @ts-ignore
        return item[i] === query[i]
      })
    }
  }
  return {
    list: pagination(currentPage, pageSize, List),
    total: List.length
  }

}

export function addUser(data: any) {
  const id = Mock.mock('@id')
  list.unshift({
    ...data,
    id
  })
  return id
}

export function pagination(currentPage: number, pageSize: number, array: any[]) {
  const offset = (currentPage - 1) * pageSize
  return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize)
}
