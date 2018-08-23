import mForm from './components/mForm.vue';
import mItem from './components/mItem.vue';
import mSelect from './components/mSelect.vue';
import mTable from './components/mTable.vue';
 
const install = function (Vue) {
  if (install.installed) return
  Vue.component(mForm.name,mForm)
  Vue.component(mItem.name,mItem)
  Vue.component(mSelect.name,mSelect)
  Vue.component(mTable.name,mTable)
}
if(window.Vue){
  install(window.Vue)
}
export default {
  install,
  mForm,
  mItem,
  mSelect,
  mTable,
}