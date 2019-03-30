<template>
  <m-table :columns="tableData.column"
    :table-data="tableData.data" expand :showNum='false' :border='false'>
    <template slot="expand" slot-scope="{row}">
      <m-form :model='row' :columns='columns' class="demo-table-expand"></m-form>
    </template>
  </m-table>
</template>

<script>
export default {
  data () {
    return {
      columns:[
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
          prop:'desc',
          span:22
        }
      ],
      tableData: {
        column: [
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
      }
    }
  }
}
</script>

<style>
  .demo-table-expand label {
    color: #99a9bf;
  }
  
</style>
