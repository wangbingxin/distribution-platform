// params [
//   [options,component,children]
// ]

export function generateRoute(routes) {
  return routes.map(val => {
    const route = {
      path: val[0].path,
      name: val[0].name,
      component: val[1],
    }
    if (val[0].meta) route.meta = val[0].meta
    if (val[0].redirect) route.redirect = val[0].redirect
    if (val[2]) route.children = generateRoute(val[2])
    return route
  })
}

export default generateRoute