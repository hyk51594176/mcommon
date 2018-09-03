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
  Cascader,
} from 'element-ui';
import mForm from './components/mForm.vue';
import mItem from './components/mItem.vue';
import mSelect from './components/mSelect.vue';
import mTable from './components/mTable.vue';
 
const install = function (Vue) {
  if (install.installed) return
  Vue.component(Input.name,Input)
  Vue.component(InputNumber.name,InputNumber)
  Vue.component(Radio.name,Radio)
  Vue.component(RadioGroup.name,RadioGroup)
  Vue.component(Checkbox.name,Checkbox)
  Vue.component(CheckboxGroup.name,CheckboxGroup)
  Vue.component(Switch.name,Switch)
  Vue.component(Select.name,Select)
  Vue.component(Option.name,Option)
  Vue.component(DatePicker.name,DatePicker)
  Vue.component(Form.name,Form)
  Vue.component(FormItem.name,FormItem)
  Vue.component(Table.name,Table)
  Vue.component(TableColumn.name,TableColumn)
  Vue.component(Tag.name,Tag)
  Vue.component(Col.name,Col)
  Vue.component(Cascader.name,Cascader)

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
