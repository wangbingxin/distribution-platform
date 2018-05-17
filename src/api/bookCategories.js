import axios from './axios'

let categories = null

function resolve(res) {
  return Promise.resolve(res)
}

function getCategories() {
  if (categories) return resolve(categories)
  else return request()
}

function request() {
  return axios('/bookCategories').then(res => {
    categories = format(res)
    getCategories = function () {
      return resolve(categories)
    }
    return categories
  })
}

function format(origin) { //格式转换
  const o = []
  for (let key in origin) {
    const item = {}, target = origin[key]
    item.value = +target.category_id
    item.label = target.category_name
    if (!Array.isArray(target.node)) item.children = format(target.node)
    o.push(item)
  }
  return o
}

let arr = []
function each(category, categories) {
  let flag = false
  for (var i = 0; i < categories.length; i++) {
    if (category === categories[i].value) {
      flag = true
    } else if (!flag && categories[i].children) {
      flag = each(category, categories[i].children)
    }
    if (flag) break
  }

  if (flag) { arr.push(categories[i].value) }
  return flag
}

export function findFullcategory(category) {
  if (!categories) console.error('findAllcategory', '未加载分类,请先加载分类')
  arr = []
  each(category, categories)
  return arr.reverse()
}

export default function wrap() {
  return getCategories()
}

export { wrap as getBookCategories }
