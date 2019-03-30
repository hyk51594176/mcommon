
# MTable

以下字段为表格的扩展和默认配置，其他配置请参照[el-table](https://element.eleme.io/#/zh-CN/component/table)
字段|说明|类型|默认值  
-|-|-|-
border|是否带有纵向边框|boolean|true
tableData|表格数据|Array|-
isTree|是否为树形表格|boolean|false
layout|分页器组件布局|string|'total,sizes,prev, pager, next, jumper'
showNum|是否显示序号列|boolean|true
numTitle|序号列名称|string|'序号'
selection|表格是否展示多选列|boolean|false
expand|表格是否可以展开|boolean|false
columns|表格描述列信息|Array|-
page|分页信息|Object||{pageNum: 1,pageSize: 15,total: 0}
pageSizes|可选择每页多少条数据|Array|[15, 30, 45, 60]
mergeRow|可合并列字段|Array|-
mergeColumn|可合并行字段|Array|-


##  基础用法
自定义列可以通过 render方法 jsx语法。或者slot-scope 来自定义列
树形结构数据的支持需要elemen-ui >=2.7

<demo-block>
<example-mtable-demo slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo.vue
</demo-block>

## 多级表头、排序、多选

<demo-block>
<example-mtable-demo1 slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo1.vue
</demo-block>

## 展开行

<demo-block>
<example-mtable-demo2 slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo2.vue
</demo-block>


## 合计行
自动合计只需在需要合并的列sSummary为true,unit 为单位,如果想要手动合并summaryMethod

<demo-block>
<example-mtable-demo3 slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo3.vue
</demo-block>

## 合并单元格
自动合并单元格传入需要合并的行和列的字段，列的合并是根据值相同合并，行的合并是根据当前属性后的几个字段为undefined
如果要手动合并传入span-method方法

<demo-block>
<example-mtable-demo4 slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo4.vue
</demo-block>

## 编辑表格
通过getColumn合并当前column对象来渲染组件

<demo-block>
<example-mtable-demo5 slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo5.vue
</demo-block>


## 导出excel

<demo-block>
<example-mtable-demo6 slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mtable/demo6.vue
</demo-block>


 

 
