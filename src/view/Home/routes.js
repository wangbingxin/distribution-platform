import { generateRoute } from '../../router/util'
import { home } from '../../namespace'
import homeComponent from './index.vue'

const route = generateRoute([[home, homeComponent]])

export default route


