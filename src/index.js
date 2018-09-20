import {
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  DatePicker,
  Form,
  FormItem,
  Table,
  TableColumn,
  Tag,
  Col,
  Cascader
} from 'element-ui'
import mForm from './components/mForm.vue'
import mItem from './components/mItem.vue'
import mSelect from './components/mSelect.vue'
import mTable from './components/mTable.vue'
import './styles/index.css'
const components = [
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  DatePicker,
  Form,
  FormItem,
  Table,
  TableColumn,
  Tag,
  Col,
  Cascader
]
const install = function (Vue, opts) {
  if (install.installed) return
  Vue.prototype.$ELEMENT = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }
  components.map(component => {
    Vue.component(component.name, component)
  })
  Vue.component(mForm.name, mForm)
  Vue.component(mItem.name, mItem)
  Vue.component(mSelect.name, mSelect)
  Vue.component(mTable.name, mTable)
}
if (window.Vue) {
  install(window.Vue)
}
export default {
  install,
  mForm,
  mItem,
  mSelect,
  mTable
}
