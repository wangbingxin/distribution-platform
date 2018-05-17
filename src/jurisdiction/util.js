/**
 * 输出格式
 * {
 *  name,
 *  key,
 *  icon,
 *  router:{
 *    name: name
 *  }
 * }
 * 
 */
function menuItemFormat(name) {
  return {
    name: name.Chinese,
    key: name.name,
    icon: name.icon,
    route: {
      name: name.name
    }
  }
}

function menuFormat(arr) {
  return arr.map(val => {
    const item = menuItemFormat(val[0])
    if (val[1]) {
      item.children = val[1].map(name => {
        return menuItemFormat(name)
      })
    }
    return item
  })
}

export default menuFormat