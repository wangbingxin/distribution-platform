import { SERVICE } from './service.js'
import { SUBSCRIPTION } from './subscription.js'
import { TOURIST } from './tourist.js'
import { Notification } from 'element-ui'
import { serviceNew } from '../namespace'

let role = null

switch (window.options.is_bind_gzh) {
  case 0:
    role = SUBSCRIPTION
    break;
  case 1:
    role = SERVICE
    break;
  default:
    role = TOURIST
    break;
}

export default role 
