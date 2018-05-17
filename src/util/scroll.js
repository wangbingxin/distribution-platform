import { QuadEaseInOut } from './index'


/**
 * 1、document.documentElement.scrollTop 和 document.body.scrollTop 兼容
 * 2、检测是否有滚动条
 */

function checkContainer(container) {
  const body = document.body, html = document.documentElement
  if (container !== html && container !== body) {
    if (container.scrollHeight === container.offsetHeight) return false
    else return container
  } else {
    if (body.scrollHeight === window.offsetHeight) return false
    else if (document.scrollingElement) return document.scrollingElement
    else {
      if (body.scrollTop || html.scrollTop) {
        return body.scrollTop ? body : html
      } else {
        body.scrollTop = 1
        html.scrollTop = 1
        if (body.scrollTop) {
          body.scrollTop = 0
          return body
        } else {
          html.scrollTop = 0
          return html
        }
      }
    }
  }
}



let flag = false

function scroll(target, container) {
  if (flag) return
  else flag = true
  container = checkContainer(container)
  const targetTop = target.offsetTop - container.offsetTop
  const initialTop = container.scrollTop
  const initialTime = new Date()
  if (Math.abs(targetTop - initialTop) < 20 && !container) return flag = false

  let timer = setInterval(function () {
    const t = new Date() - initialTime
    const b = initialTop
    const c = targetTop - initialTop - 20
    const d = 400
    const scrollTop = QuadEaseInOut(t > d ? d : t, b, c, d)
    if (t >= d) {
      clearInterval(timer)
      flag = false
    }

    container.scrollTop = scrollTop
  }, 30)
}

export default scroll