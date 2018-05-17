import generateRoute from '../../router/util.js'
import passportComponent from './index.vue'
import loginComponent from './login.vue'
import passwordComponent from './password.vue'
import registerComponent from './register.vue'
import { passport, login, password, register } from '../../namespace'

const children = [
  [login, loginComponent],
  [password, passwordComponent],
  [register, registerComponent],
]

const routes = generateRoute([
  [passport, passportComponent, children]
])

export default routes