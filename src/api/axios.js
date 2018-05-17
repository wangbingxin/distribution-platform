import axios from 'axios';
import { Message } from 'element-ui';
import { testDataStructure } from './util.js'
import router from '../router'
import { login } from '../namespace/index'

var instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use(function (res) {
  if (res.data.code === 0) {
    if (process.env.NODE_ENV === 'development') console.log(res.config.url.split('/').pop(), res.config.params ? res.config.params : '', '\n', res.data.data)
    if (res.config.method === 'post') {
      switch (res.config.message) {
        case undefined:
          Message('设置成功')
          break;
        case false:
          break;
        default:
          Message(res.config.message)
          break;
      }
    } else if (res.config.type) { res.data.data = testDataStructure(res.data.data, res.config.type, res.config.name) }
    return res.data.data
  }
  else {
    if (res.data.code === 10010) {
      router.replace({
        name: login.name
      })
    }
    if (typeof res.data.msg === 'string' && !res.config.notErrMessage ) Message.error(res.data.msg)
    return Promise.reject(res)
  }
})

export default instance