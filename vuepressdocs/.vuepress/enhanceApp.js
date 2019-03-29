import elementUI from 'element-ui';
import MForm from '../../src/components/MForm'
import MItem from '../../src/components/MItem'
import MSelect from '../../src/components/MSelect'
import MTable from '../../src/components/MTable'
import DemoBlock from './components/demo-block';
import 'element-ui/lib/theme-chalk/index.css'
export default ({Vue}) => {
  Vue.use(elementUI)
  Vue.component(MForm.name, MForm)
  Vue.component(MItem.name, MItem)
  Vue.component(MSelect.name, MSelect)
  Vue.component(MTable.name, MTable)
  Vue.component('demo-block', DemoBlock)
}