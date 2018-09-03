<template>
  <div>
    <el-table
      :data="list"
      :border='border'
      :stripe="stripe"
      :summary-method='summarymethod||summaryDefault'
      :show-summary='isShowSummary'
      @row-click='rowClick'
      @cell-click='cellClick'
      @selection-change="handleSelectionChange"
      @sort-change='sortChange'
      @current-change="currentChange"
      ref='commontable' v-bind="$attrs" v-on="$listeners">
      <el-table-column type="expand" v-if='expand'>
        <template slot-scope='scope'>
          <slot name='expand' :row='scope.row' :$index='scope.$index'>
          </slot>
        </template>
      </el-table-column>
      <el-table-column type="selection" :selectable='selectable' align="center" v-if='selection&&list.length'>
      </el-table-column>
      <el-table-column :label="numTitle" align="center" width='60' v-if='showNum&&list.length' :fixed="numFiexd">
        <template slot-scope='scope'>
          <slot name='mnum' :row='scope.row' :num="scope.$index+1+((page.pageIndex-1)*page.pageSize)" :$index='scope.$index'>
            <span style="margin-left: 10px">{{ scope.$index+1+((page.pageIndex-1)*page.pageSize)}}</span>
          </slot>
        </template>
      </el-table-column>
      <template v-for='obj in columns'>
        <el-table-column
          v-bind="obj"
          :class-name='obj.className||obj.el'
          :align='obj.align||"center"'
          :filter-method="obj.filters?filtetag.bind(null,obj):null"
          :key='getKey(obj.prop)'>
          <template slot-scope='scope'>
            <slot :name='obj.prop' :row='scope.row' :$index='scope.$index' :column="obj">
                <span v-if='!obj.el'>
                  {{scope.row[obj.prop]}}
                </span>
              <span v-else-if='obj.el==="boolean"'>
                {{scope.row[obj.prop]===true?obj.trueLabel:obj.falseLabel}}
              </span>
              <m-item
                :column='getColumns(obj,scope)'
                @currentObj='(data,key)=>currentObj(scope,data,key)'
                :row='scope.row' v-else />
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <slot name='page'>
      <el-pagination
        style="text-align:right" v-if='showPage'
        :current-page="page.pageIndex"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageSizes"
        :page-size="page.pageSize" :layout="layout" :total="total||tableData.length" />
    </slot>
  </div>
</template>
<script>
export default {
  name: 'm-table',
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    layout: {
      type: String,
      default: 'total,sizes,prev, pager, next, jumper'
    },
    showNum: {
      type: Boolean,
      default: true
    },
    selectable: {
      type: Function
    },
    numFiexd: Boolean,
    showPage: {
      type: Boolean,
      default: true
    },
    forced: Boolean,
    showsummary: {
      type: Boolean,
      default: false
    },
    summarymethod: {
      type: Function
    },
    border: {
      type: Boolean,
      default: true
    },
    stripe: {
      type: Boolean,
      default: true
    },
    numTitle: {
      type: String,
      default: '序号'
    },
    total: Number,
    selection: {
      type: Boolean,
      default: false
    },
    expand: Boolean,
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    page: {
      type: Object,
      default () {
        return {
          pageIndex: 1,
          pageSize: 15
        }
      }
    },
    pageSizes: {
      type: Array,
      default () {
        return [15, 30, 45, 60]
      }
    }
  },
  inheritAttrs: false,
  computed: {
    list () {
      if (this.total || !this.showPage) {
        return this.tableData
      }
      return this.tableData.filter((obj, index) => {
        return (
          index >= (this.page.pageIndex - 1) * this.page.pageSize &&
          index < this.page.pageIndex * this.page.pageSize
        )
      })
    },
    summaryProps () {
      return this.columns.filter(obj => obj.isSummary).map(item => item.prop)
    },
    isShowSummary () {
      return this.columns.some(obj => obj.isSummary)
    }
  },
  watch: {
    tableData () {
      if (this.total === '' || this.total === null || isNaN(this.total)) this.page.pageIndex = 1
    }
  },
  methods: {
    getKey (str) {
      if (this.forced) return (str || '') + (Math.random() * Date.now())
      return str
    },
    getColumns (obj, scope) {
      let listeners = null
      if (obj.listeners) {
        listeners = Object.keys(obj.listeners).reduce((x, y) => {
          return {
            ...x,
            [y]: obj.listeners[y].bind(null, scope)
          }
        }, {})
      }
      return {
        ...obj,
        disabled: obj.disabled || scope.row.disabled,
        readonly: obj.readonly || scope.row.readonly,
        listeners
      }
    },
    summaryDefault (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        } else {
          if (this.summaryProps.indexOf(column.property) < 0) return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
        }
        sums[index] = parseFloat(sums[index] || 0).toFixed(2)
        if (column.className === 'currency' && sums[index]) {
          sums[index] = (sums[index] + '').replace(
            /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
            '$&,'
          )
        }
        if (column.className === 'Percentage' && sums[index]) {
          sums[index] = sums[index] + '%'
        }
      })
      return sums
    },
    handleSizeChange (val) {
      this.page.pageSize = val
      this.$emit('pageChange', this.page)
    },
    handleCurrentChange (val) {
      this.page.pageIndex = val
      this.$emit('pageChange', this.page)
    },
    toggleRowSelection (rows) {
      rows.forEach(row => {
        this.$refs.commontable.toggleRowSelection(row)
      })
    },
    clearSelection () {
      this.$refs.commontable.clearSelection()
    },
    handleSelectionChange (arr) {
      if (this.$listeners['selection-change']) return
      this.$emit('selectionChange', arr)
    },
    sortChange (sortObj) {
      if (this.$listeners['sort-change']) return
      this.$emit('sortChange', sortObj)
    },
    rowClick (row, event, column) {
      if (this.$listeners['row-click']) return
      this.$emit('rowClick', row, event, column)
    },
    cellClick (row, event, column) {
      if (this.$listeners['cell-click']) return
      this.$emit('cellClick', row, event, column)
    },
    currentChange (val) {
      if (this.$listeners['current-change']) return
      this.$emit('currentChange', val)
    },
    filtetag (column, value, row) {
      if (typeof column.filterMethod === 'function') {
        return column.filterMethod(column, value, row)
      } else {
        return row[column.prop] === value
      }
    },
    goto (obj) {
      this.$emit('gotolink', obj)
    },
    currentObj (scope, data, key) {
      this.$emit('currentObj', scope.row, data, key, scope.$index)
    }
  }
}
</script>
