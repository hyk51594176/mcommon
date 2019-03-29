<template>
  <div>
    <m-table ref="multipleTable"
      :columns="tableData.column"
      :table-data="tableData.data" :showNum='false'
      @current-change="handleSelectionChange" selection>
    </m-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData.data[1], tableData.data[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        column: [
          {
            prop: 'date',
            label: '日期'
          },
          {
            prop: 'name',
            label: '姓名'
          },
          {
            prop: 'address',
            label: '地址'
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
      },
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        this.$refs.multipleTable.toggleRowSelection(rows)
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>
