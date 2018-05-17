const toString = Object.prototype.toString

function isObject(obj) {
  return toString.call(obj) === '[object Object]'
}

function isArray(obj) {
  return toString.call(obj) === '[object Array]'
}

function each(o, fn) {
  if (isObject(o)) {
    for (let key in o) { fn(o[key], key, o) }
  } else if (isArray(o)) {
    o.forEach(fn)
  }
}

function getType(fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function assertType(orgin, expect, root, path) {
  let expectedType = getType(expect)
  if (expectedType) {
    if (typeof orgin !== expectedType.toLowerCase()) {
      error(expect, root, path)
    }
    return true
  } else {
    return false
  }
}

function generateExpectedDate(expect) {
  if (getType(expect)) return expect()
  else {
    const data = isArray(expect) ? [] : {}
    each(expect, function (expect, key) {
      data[key] = generateExpectedDate(expect)
    })
    return data
  }
}

function error(expect, root, path) {
  console.error(`${root.name}[${path.join('][')}] 类型错误`)
  if (!path.length) {
    root.store = generateExpectedDate(expect)
  } else {
    let current = root.store
    path.forEach((val, i) => {
      if (path.length !== i + 1) current = current[val]
      else current[val] = generateExpectedDate(expect)
    })
  }
}

function testDataStructure(orgin, expect, root, path, level) {
  if (!assertType(orgin, expect, root, path)) {
    if (isArray(expect) && isArray(orgin)) {
      each(orgin, function (val, key, o) {
        path[level] = key
        testDataStructure(val, expect[0], root, path.slice(), level + 1)
      })
    } else if (isObject(expect) && isObject(orgin)) {
      each(expect, function (val, key, o) {
        path[level] = key
        testDataStructure(orgin[key], val, root, path.slice(), level + 1)
      })
    } else {
      error(expect, root, path)
    }
  }
}

function wrap(orgin, expect, name) {
  const root = { name: name, store: orgin }
  testDataStructure(orgin, expect, root, [], 0)
  return root.store
}

export { wrap as testDataStructure }