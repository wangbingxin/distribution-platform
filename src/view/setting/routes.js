import { generateRoute } from '../../router/util'
import {
  settingService,
  serviceNew,
  serviceList,
  serviceOption
} from '../../namespace'

import serviceComponent from './service/index.vue'
import serviceNewComponent from './service/serviceNew.vue'
import serviceListComponent from './service/serviceList.vue'
import serviceOptionComponent from './service/serviceOption.vue'

import role from '../../jurisdiction'

settingService.redirect = {
  name: role.route[serviceList.name] ? serviceList.name : serviceNew.name
}  

const serviceChildren = [
  [serviceNew, serviceNewComponent,],
  [serviceList, serviceListComponent,],
  [serviceOption, serviceOptionComponent,]
]

let routes = generateRoute([
  [settingService, serviceComponent, serviceChildren]
])

export default routes;