import MForm from './components/MForm'
import MItem from './components/MItem'
import MSelect from './components/MSelect'
import MTable from './components/MTable'
const install = function (Vue) {
  if (install.installed) return
  if (!Vue.prototype.$ELEMENT) {
    throw new Error('请先安装element-ui')
  }
  Vue.component(MForm.name, MForm)
  Vue.component(MItem.name, MItem)
  Vue.component(MSelect.name, MSelect)
  Vue.component(MTable.name, MTable)
  install.installed = true
}
if (window && window.Vue) {
  install(window.Vue)
}
export default {
  install,
  MForm,
  MItem,
  MSelect,
  MTable
}
