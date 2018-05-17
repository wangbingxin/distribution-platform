import Vue from 'vue'
import {
  Menu,
  MenuItem,
  Submenu,
  Tag,
  Pagination,
  Popover,
  Message,
  Button,
  Select,
  Option,
  Input,
  Dialog,
  Form,
  FormItem,
  DatePicker,
  Upload,
  Cascader,
  Radio,
  RadioGroup,
  MenuItemGroup,
  Loading,
  // Notification
} from 'element-ui'

import table from './table/table.vue'
import subTitle from './sub-title.vue'
import grid from './grid.vue'
import svg from './svg.vue'
import head from './head.vue'
import pagination from './pagination.vue'

Cascader.methods.hideMenu = function () {
  this.inputValue = '';
  this.menu.visible = false;
  this.$emit('close')
}

Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Tag)
Vue.use(Pagination)
Vue.use(Popover)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Cascader)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(MenuItemGroup)
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
// Vue.prototype.$notify = Notification

Vue.use(table)
Vue.use(subTitle)
Vue.use(grid)
Vue.use(head)
Vue.use(svg)
Vue.use(pagination)
