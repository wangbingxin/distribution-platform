import { generateRoute } from '../../../router/util'

import statisticsPromoteComponent from '../statisticsPromote.vue'
import statisticsRecordComponent from '../statisticsRecord.vue'
import statisticsCenterComponent from '../statisticsCenter/index.vue'

// 结算中心 子级路由
import statisticsAmountComponent from '../statisticsCenter/statisticsAmount.vue'
import statisticsWithdrawComponent from '../statisticsCenter/statisticsWithdraw.vue'
import statisticsWithdrawSettingComponent from '../statisticsCenter/statisticsWithdrawSetting.vue'

import {
  statisticsCenter,
  statisticsAmount,
  statisticsWithdraw,
  statisticsWithdrawSetting,
  statisticsPromote,
  statisticsRecord
} from '../../../namespace'


const statisticsCenterChildren = [
  [statisticsAmount,statisticsAmountComponent],
  [statisticsWithdraw,statisticsWithdrawComponent],
  [statisticsWithdrawSetting,statisticsWithdrawSettingComponent]
]


let routes = generateRoute([
  [statisticsPromote,statisticsPromoteComponent],
  [statisticsRecord,statisticsRecordComponent],
  [statisticsCenter,statisticsCenterComponent,statisticsCenterChildren]
])

export default routes
