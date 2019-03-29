<template>
  <div>
    <m-table :columns="tableData.column"
      :table-data="tableData.data"
      :show-page='false'
      >
    </m-table>
    <br>
    <m-table :columns="tableData.column1"
      :table-data="tableData.data"
      :show-page='false'
      header-align="right"
      >
    </m-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期',
            width: '120',
            align: 'right'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120',
            align: 'left'
          },
          {
            prop: 'address',
            label: '地址'
          }
        ],
        column1: [
          {
            prop: 'date',
            label: '日期',
            width: '120',
            align: 'left'
          },
          {
            prop: 'name',
            label: '姓名',
            width: '120',
            align: 'left'
          },
          {
            prop: 'address',
            label: '地址',
            headerAlign: 'left'
          }
        ],
        data: [
          {
            date: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-02',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ]
      }
    }
  }
}
</script>
