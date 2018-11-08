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
import MForm from './components/MForm.vue'
import MItem from './components/MItem.vue'
import MSelect from './components/MSelect.vue'
import MTable from './components/MTable.vue'
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
  if(!Vue.prototype.$ELEMENT){
    Vue.prototype.$ELEMENT = {
      size: opts.size || '',
      zIndex: opts.zIndex || 2000
    }
    components.map(component => {
      Vue.component(component.name, component)
    })
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
