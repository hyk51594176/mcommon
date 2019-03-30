<template>
  <div>
    <m-table
      :table-data="tableData"
      ref="mtable"
      :columns="columns"
      :showPage="false"
      selection
      @selection-change="selectChange"
      height="400"
      :showNum="false"
    >
      <template slot="date" slot-scope="scope">{{scope.row.date}}</template>
    </m-table>
    <br>
    <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      columns: [
        {
          prop: "date",
          fixed: true,
          sortable: true,
          width: "120",
          renderHeader: (h, scope) => {
            return (
              <span>
                <i class="el-icon-time" />日期
              </span>
            );
          }
        },
        {
          label: "配送信息",
          children: [
            {
              prop: "name",
              width: "120",
              render: (h, scope) => {
                return <el-tag>{scope.row.name}</el-tag>;
              }
            },
            {
              label: "地址",
              children: [
                {
                  prop: "province",
                  label: "省份",
                  width: "120"
                },
                {
                  prop: "city",
                  label: "市区",
                  width: "120"
                },
                {
                  prop: "address",
                  label: "地址",
                  sortable: true,
                  width: "300px",
                  renderHeader: (h, scope) => {
                    return (
                      <span>
                        <i class="el-icon-location-outline" />地址
                      </span>
                    );
                  }
                }
              ]
            }
          ]
        }
      ]
    };
  },
  created() {
    for (let i = 0; i < 10; i++) {
      this.tableData.push({
        date: `2016-05-${i + 1}`,
        name: `王小虎${i + 1}`,
        province: "上海",
        city: "普陀区",
        address: `上海市普陀区金沙江路 ${i + 1} 弄`,
        zip: 200333
      });
    }
  },
  methods: {
    selectChange(arr) {
      console.log(arr);
    },
    toggleSelection(rows) {
      if (rows) {
        this.$refs.mtable.toggleRowSelection(rows);
      } else {
        this.$refs.mtable.clearSelection();
      }
    }
  }
};
</script>
