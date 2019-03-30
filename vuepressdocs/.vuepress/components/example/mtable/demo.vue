<template>
  <div>
    <m-form :model="options" :columns='optionsColumns'></m-form>
    {{options}}
    <br>
   <m-table :table-data='tableData' :page='pageInfo' @pageChange='pageChange' row-key='id' :columns='columns' v-bind="options">
     <template slot="slot" slot-scope="{row,$index}">
       $index = {{$index}}
     </template>
   </m-table>
  </div>
</template>
<script>
import tableData from './data.json'
export default {
  data() {
    return {
      options:{
        border:false,
        stripe:false,
        isTree:false,
        showPage:false,
        size:'small',
        showNum:false
      },
      pageInfo:{
        pageSize:15,
        pageNum:1,
        total:0
      },
      optionsColumns:[
        {
          label:'斑马线',
          el:'switch',
          prop:'stripe',
        },{
          label:'树形结构',
          el:'switch',
          prop:'isTree',
        },{
          label:'纵向边框',
          el:'switch',
          prop:'border',
        },{
          label:'分页',
          el:'switch',
          prop:'showPage',
        },{
          label:'尺寸',
          prop:'size',
          el:'radio-group',
          type:'button',
          dataList:[
            {
              label:'medium',
              value:'medium'
            },{
              label:'small',
              value:'small'
            },{
              label:'mini',
              value:'mini'
            }
          ]
        },{
          label:'序号列',
          prop:'showNum',
          el:'switch',
        }
      ],
      columns:[
        {
          prop:'value',
          label:'名称',
          align:'left',
          width:150,
        },{
          label:'描述',
          prop:'label',
        },{
          label:'id',
          prop:'id',
        },{
          label:'slotScope渲染',
          prop:'slot',
          width:130,
        },{
          label:'状态',
          prop:'state',
          format(obj){
            return obj.state?'启用':'禁用'
          }
        },
        {
          label:'render渲染',
          prop:'render',
          render:(h,scope)=>{
            return  <el-button type='primary'>编辑</el-button>
          },
        }
      ]
    }
  },
  computed:{
    tableData(){
      let list = JSON.parse(JSON.stringify(tableData))
      if(this.options.isTree){
        return list
      }else{
        return list.reduce(function flat(arr,obj){
          if(obj.children){
            obj.children.reduce(flat,arr)
            delete obj.children
          }
          arr.push(obj)
          return arr
        },[])
      }
    }
  },
  methods: {
    pageChange(pageInfo){
      this.pageInfo = pageInfo
    }
  }
 
};
</script>
