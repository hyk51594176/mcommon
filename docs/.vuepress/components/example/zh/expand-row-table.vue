<template>
<div>

  <m-table :columns="tableData.column"
    :table-data="tableData.data" :showNum='false' :showPage='false'>
  </m-table>
<m-table :columns="tableData.column2"
    :table-data="tableData.data" :showNum='false' expand :showPage='false'>
  <m-form slot-scope="{row}" slot="expand"  class="demo-table-expand"  :model='row' :columns='formColumns'/>
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
            type: 'expand',
            render: (h, {row}) => {
              return  <m-form model={row} columns={this.formColumns}  class="demo-table-expand" />
            }
          },
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '商品名称'
          },
          {
            prop: 'desc',
            label: '描述'
          }
        ],
        column2:[
          
          {
            prop: 'id',
            label: 'ID'
          },
          {
            prop: 'name',
            label: '商品名称'
          },
          {
            prop: 'desc',
            label: '描述'
          }
        ],
        data: [
          {
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          },
          {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }
        ]
      },
      formColumns:[
        {
          label:'商品名称',
          prop:'name'
        },{
          label:'所属店铺',
          prop:'shop'
        },{
          label:'商品 ID',
          prop:'id'
        },{
          label:'店铺 ID',
          prop:'shopId'
        },{
          label:'商品分类',
          prop:'category'
        },{
          label:'店铺地址',
          prop:'address'
        },{
          label:'商品描述',
          prop:'desc'
        }
      ]
    }
  }
}
</script>

<style>
  .demo-table-expand label {
    color: #99a9bf;
  }
  
</style>
