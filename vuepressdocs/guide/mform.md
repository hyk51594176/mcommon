
# MForm

## 参数配置
 以下字段为MForm扩展配置，其他配置和事件请参照[el-form](https://element.eleme.io/#/zh-CN/component/form)
字段|说明|类型|默认值  
-|-|-|-
elRow|[el-row](https://element.eleme.io/#/zh-CN/component/row)的props配置|object|-
noWrap|是否响应式换行|boolean|-
columns|form的每个组件配置|Array|-

 ### columns 示例 
```js
[
  {
    label:'姓名', // 对应 form-item label
    el:'el-input', // 要渲染的elementUI组件 可以省略el 直接写el:'input',不写该字段默认会渲染成 span h('span',null,当前model对应prop字段的值)
    render(h){}, // 可自定义渲染需要的组件，当el启用时，该字段不启用
    prop:'name', // 对应 form mode字段需要绑定的key
    slots:{  // 可选插槽 对应 要渲染的组件的插槽
      ...//
      prepend(h){
        reutrn  h('button',null,'test')
      }
    },
    listeners:{ // 可选监听事件 对应 要渲染的组件所有的事件名称，具体请看 elementui 文档
      change(e){
        
      }
    },
    rules:{ // el-form-item 的验证

    },
    getColumn(obj){

    },//返回colum 来进行合并 
    ... //其他 可选props 包括 要渲染组件的props, el-form-item 对应的props,el-col对应props，都可以定义在当前对象中 
  }
]
```


## 用法

<demo-block>
<example-mform-demo slot="source"/>
 <<< @/vuepressdocs/.vuepress/components/example/mform/demo.vue
</demo-block>