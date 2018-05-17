import { generateRoute } from '../../router/util'
import { promotionNovel, promotionPage, promotionNotify, promotionNotifyNew, promotionNotifyList, promotionNovelInfo } from '../../namespace'
import novel from './novel.vue'
import page from './page.vue'
import novelInfo from './novel-info.vue'
import notify from './notify'
import notifyList from './notify/list.vue'
import notifyNew from './notify/new.vue'

const NotifyChildren = [
  [promotionNotifyNew, notifyNew],
  [promotionNotifyList, notifyList],
]

const routes = generateRoute([
  [promotionNovel, novel],
  [promotionPage, page],
  [promotionNovelInfo, novelInfo],
  [promotionNotify, notify, NotifyChildren],
])


export default routes
