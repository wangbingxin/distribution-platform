import novelCopyComponent from './novel-copy.vue'
import novelReaderComponent from './novel-reader'
import { novelCopy, novelReader } from '../../namespace/index.js'
import generateRoute from '../../router/util'

const routes = generateRoute([
  [novelCopy, novelCopyComponent],
  [novelReader, novelReaderComponent],
])

export default routes
