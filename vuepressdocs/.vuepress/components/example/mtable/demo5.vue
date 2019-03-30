<template>
  <m-table :tableData='tableData' :columns='columns' :showPage='false' :showNum='false'>
  <template slot="btn" slot-scope="scope">
    <el-button type="text" v-if='!scope.row.edit' @click="edit(scope.row)">编辑</el-button>
    <el-button v-else type="text" @click="save(scope.row)">保存</el-button>
    <el-button type="text" v-if='scope.row.edit' @click="cancel(scope.row)">取消</el-button>
  </template>
  </m-table>
</template>
<script>
export default {
  data () {
    return {
       columns: [
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '姓名',
            getColumn:row=>({el:row.edit?'input':null})
          },
          {
            prop: 'amount1',
            label: '数值1',
            sortable: true,
          },
          {
            prop: 'amount2',
            label: '数值2',
            sortable: true,
            getColumn:row=>({el:row.edit?'input':null})
          },
          {
            prop: 'amount3',
            label: '数值3',
            sortable: true
          },{
            label:'操作',
            prop:'btn'
          }
        ],
        tableData: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3',
            edit:false,
            amount3: 10
          },
          {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '3',
            edit:false,
            amount3: 12
          },
          {
            id: '12987124',
            name: '王小虎',
            amount2: '3',
            amount1: '324',
            edit:false,
            amount3: 9
          },
          {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2',
            edit:false,
            amount3: 17
          },
          {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4',
            edit:false,
            amount3: 15
          }
        ]
    }
  },
  methods: {
    edit(row){
      row.edit = true
      row._copyObj = JSON.stringify(row)
    },
    save(row){
      row.edit = false
      delete row._copyObj
    },
    cancel(row){
      Object.assign(row,JSON.parse(row._copyObj),{edit:false})
      delete obj._copyObj
    },
  }
}
</script>

