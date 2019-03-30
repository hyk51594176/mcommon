<template>
<div>
  <el-button type="primary" @click="exportExcel">导出excel</el-button>
  <m-table :tableData='tableData' :columns='columns' ref="mtable" :showPage='false' :showNum='false'>
  </m-table>
</div>
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
          },
          {
            prop: 'amount3',
            label: '数值3',
            sortable: true
          }
        ],
        tableData: [
          {
            id: '12987122',
            name: '王小虎',
            amount1: '234',
            amount2: '3',
            amount3: 10
          },
          {
            id: '12987123',
            name: '王小虎',
            amount1: '165',
            amount2: '3',
            amount3: 12
          },
          {
            id: '12987124',
            name: '王小虎',
            amount2: '3',
            amount1: '324',
            amount3: 9
          },
          {
            id: '12987125',
            name: '王小虎',
            amount1: '621',
            amount2: '2',
            amount3: 17
          },
          {
            id: '12987126',
            name: '王小虎',
            amount1: '539',
            amount2: '4',
            amount3: 15
          }
        ]
    }
  },
  methods: {
    exportExcel(){
      this.$refs.mtable.exportCsv({
        filename:'导出excel'
      })
    }
  }
}
</script>

