
# MSelect

## 参数配置
 以下字段为MSelect的默认配置、扩展事件和选项，其他配置和事件请参照[el-select](https://element.eleme.io/#/zh-CN/component/select)
### Props

字段|说明|类型|默认值  
-|-|-|-
params|请求参数|object|{}
valueKey|对应数据绑定和展示字段|Object|{  label: 'label', value: 'value' }
dataList|下拉数据|array|[]
getList|异步获取数据的方法,当dataList不为空时不执行该方法|promise|-
filterable|是否可搜索|boolean| true
clearable|是否可清楚|boolean| true
### Events
事件名称|说明|回调参数  
-|-|-
selectList|当异步请求数据时成功回调|当前下拉数据 array
currentObj|当前选中或清除时回调| 当前选中的数据 object、null

## 用法

<demo-block>
<example-mselect-demo1 slot="source"/>
 <<< @/docs/.vuepress/components/example/mselect/demo1.vue
</demo-block>

 
