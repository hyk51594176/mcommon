---
sidebar: auto
---

# 指南

## 安装
```sh
  npm install @hanyk/mcommon
```

```js
import Vue from 'vue'
import elementUI from 'element-ui'

import mcommon from '@hanyk/mcommon'
Vue.use(elementUI)
Vue.use(mcommon)
```
## 表格示例

### 扩展配置

一下字段为表格的扩展和默认配置，其他配置请参照[el-table](https://element.eleme.io/#/zh-CN/component/table)
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
columns|表格描述列|Array|-
page|分页信息|Object||{pageNum: 1,pageSize: 15,total: 0}
pageSizes|可选择每页多少条数据|Array|[15, 30, 45, 60]
mergeRow|可合并列字段|Array|-
mergeColumn|可合并行字段|Array|-

### 基础表格
基础的表格展示用法。

<demo-block>
  <example-zh-basis-table slot="source"></example-zh-basis-table>
  <<< @/docs/.vuepress/components/example/zh/basis-table.vue
</demo-block>

### 表格对齐
表格头部及内容的对齐方式。

<demo-block><example-zh-align-table slot="source"></example-zh-align-table>默认表头及表格内容剧中对齐，可以分别设置不同字段的表头及表格内容对齐方式.
<<< @/docs/.vuepress/components/example/zh/align-table.vue</demo-block>


### 多选
选择多行数据时使用 Checkbox。

<demo-block>
  <example-zh-multiple-table slot="source"></example-zh-multiple-table>
  <<< @/docs/.vuepress/components/example/zh/multiple-table.vue
</demo-block>
