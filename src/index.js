import MForm from './components/MForm.vue'
import MItem from './components/MItem.vue'
import MSelect from './components/MSelect.vue'
import MTable from './components/MTable.vue'
import './styles/index.css'
const install = function (Vue, opts) {
  if (install.installed) return
  if (!Vue.prototype.$ELEMENT) {
    throw new Error('请先安装element-ui')
  }
  Vue.component(MForm.name, MForm)
  Vue.component(MItem.name, MItem)
  Vue.component(MSelect.name, MSelect)
  Vue.component(MTable.name, MTable)
}
if (window.Vue) {
  install(window.Vue)
}
export default {
  install,
  MForm,
  MItem,
  MSelect,
  MTable
}
