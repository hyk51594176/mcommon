import elementUI from 'element-ui';
import mcommon from '../../src'
import 'element-ui/lib/theme-chalk/index.css'
import DemoBlock from './components/demo-block'

export default ({Vue}) => {
  Vue.use(elementUI,{size:'small'})
  Vue.use(mcommon)
  Vue.component('demo-block', DemoBlock)
}