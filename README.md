 
> 基于element-ui封装的form表单和table

#### 用法

>npm install @hanyk/mcommon 

```javascript

import Vue from 'vue'

import mcommon from '@hanyk/mcommon'

Vue.use(mcommon)
```
 
 用法

```html
<template>
  <m-form slot="search" :formData="formData" :columns="formColumns" ref="mform">
    <template #btn">
      <el-button type="primary" icon="el-icon-search" @click="getList">查询</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
    </template>
  </m-form>
  <m-table :tableData="tableData" :columns="tableColumns" slot="table" >
    <template  #btn='scope'>
      <el-button  type="text"  @click="delData(scope.row)">删除</el-button>
      <el-button  type="text"  @click="editData(scope.row)">
        编辑
      </el-button>
    </template>
  </m-table>
</template>
```
```javascript
export default {
  data: () => ({
    formData: {},
    formColumns: [
      {
        el: 'input',
        label: '姓名',
        prop: 'name',
        elRow:{} // 可配置el-row
        span: 12, // el-col span
        rules: {
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }
      },
      {
        el: 'input',
        label: '电话',
        prop: 'tel',
        span: 12,
        rules: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      },{
        el: 'select',
        label: '部门',
        prop: 'dept', //可添加插槽 dept
        span: 12,
        params:{
          name:'name'
        }, //启用getlist时 调用参数 key对应请求参数key，value对应数据formData的key或者给定的值 当参数变更时会自动请求数据
        dataList: [
          {
            name: '研发',
            id: 1
          },
        ], // dataList 和 getList 二选一 
        //  getList: params=>Promie.reslove([
        //   {
        //     label: '研发',
        //     value: 1
        //   },
        // ])
        valueKey:{
          label: 'id', 
          value: 'name'
        }, // 默认字段是label 和 value 需要更改对应字段时添加
        rules: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        listeners:{
          change:()=>{} // 监听事件
        }
      },{
        prop: 'btn' // 可添加插槽 btn
      }

    ],
    tableData: [],
    tableColumns: [
      {
        el: 'input', // 可选择标签，
        label: '姓名',
        prop: 'name',
        width: 120
      },
      {
        // el: 'input',
        label: '电话',
        prop: 'tel',
        render:(h,{row})=><el-tag>{row.tel}</el-tag> // 通过render渲染
      },
      {
        label: '部门',
        prop: 'dept',
        format:obj=>obj.dept // 对数据格式化
      },
      {
        prop: 'btn',
        label: '操作'
      }
    ] 
  })
}

// 其他配置参数请看element-ui
```