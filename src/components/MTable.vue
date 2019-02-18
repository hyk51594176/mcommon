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
      <el-table-column type="expand" v-if='expand && !isTree' >
        <template slot-scope="scope">
          <slot name='expand' :row='scope.row' :$index='scope.$index'/>
        </template>
      </el-table-column>
      <el-table-column type="selection" :selectable='selectable' :reserve-selection='reserveSelection' align="center" v-if='(selection&&list.length)'>
      </el-table-column>
      <el-table-column :label="numTitle" align="center" width='60' v-if='showNum && list.length && !isTree' :fixed="numFiexd||(columns[0]&&columns[0].fixed)">
        <template slot-scope='scope'>
          <slot name='mnum'  :row='scope.row' :num="scope.$index+1+((page.pageNum-1)*page.pageSize)" :$index='scope.$index'>
            <span style="margin-left: 10px">{{ scope.$index+1+((page.pageNum-1)*page.pageSize)}}</span>
          </slot>
        </template>
      </el-table-column>
      <slot></slot>
      <template v-for='(obj,index) in columns'>
        <el-table-column
          v-bind="obj"
          :class-name='obj.className||obj.el'
          :align='obj.align||"center"'
          :filter-method="obj.filters?filtetag.bind(null,obj):null"
          :key='getKey(obj.prop)'>
          <span slot-scope='scope' :class="isTree && index === 0?'first-columns':null">
              <span v-if="scope.row.treeLevel && index === 0" :style="{minWidth:`${scope.row.treeLevel*15}px`}"></span>
              <span v-if="scope.row.expandAll!==undefined && index === 0"  class="expan-icon" @click="expandClick(scope)">
                <i :class="scope.row.expandAll?'el-icon-minus':'el-icon-plus'" ></i>&nbsp;
              </span>
              <slot :name='obj.prop' :row='scope.row' :$index='scope.$index' :column="obj">
                <m-item
                  :column='getColumns(obj,scope)'
                  @currentObj='(data,key)=>currentObj(scope,data,key)'
                  :row='scope.row' :index='scope.$index' class="m-item"/>
              </slot>
          </span>
        </el-table-column>
      </template>
      <el-table-column :align="buttonAlign||'center'" :fixed="buttonFixed" :width="buttonWidth" :label='buttonLabel' v-if="$scopedSlots.button">
        <template slot-scope='{ row, $index }'>
          <slot :row='row' :$index='$index' name="button" ></slot>
        </template>
      </el-table-column>
    </el-table>
    <slot name='page'>
      <el-pagination
        style="text-align:right" v-if='showPage && !isTree'
        :current-page="page.pageNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pageSizes"
        :page-size="page.pageSize" :layout="layout" :total="cTotal" />
    </slot>
  </div>
</template>
<script>
import ExportCsv from '../utils/export-csv'
export default {
  name: 'MTable',
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    isTree: Boolean,
    buttonWidth: [String, Number],
    buttonAlign: {
      type: String,
      default: 'center'
    },
    buttonFixed: {
      type: String,
      default: 'right'
    },
    buttonLabel: {
      type: String,
      default: '操作'
    },
    reserveSelection: Boolean,
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
      default: false
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
          pageNum: 1,
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
  data () {
    return {
      treeData: this.formatTreeData(this.tableData)
    }
  },
  computed: {
    cTotal () {
      const t = this.total || (this.page && this.page.total)
      if (t) return t
      return this.isTree ? this.treeData.length : this.tableData.length
    },
    list () {
      if (this.isTree) return this.treeData
      const t = this.total || (this.page && this.page.total)
      // if (this.showPage) return this.tableData
      // if (!this.showPage && !t) {
      //   return this.tableData
      // }
      if (this.showPage || !t) {
        return this.tableData
      }
      return this.tableData.filter((obj, index) => {
        return (
          index >= (this.page.pageNum - 1) * this.page.pageSize &&
          index < this.page.pageNum * this.page.pageSize
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
      const count = this.total || this.page.total
      if (!count && isNaN(count)) this.page.pageNum = 1
      if (this.isTree) this.treeData = this.formatTreeData(this.tableData)
    }
  },

  methods: {
    formatTreeData (data, level = 0, arr = []) {
      data.forEach(obj => {
        obj.treeLevel = level
        arr.push(obj)
        if (obj.children && obj.children.length) {
          const key = this.$attrs.rowKey || this.$attrs['row-key']
          if (this.treeData && this.treeData.length && key) {
            const o = this.treeData.find(item => item[key] === obj[key]) || { expandAll: false }
            obj.expandAll = o.expandAll
          }
          if (obj.expandAll === undefined)obj.expandAll = false
          if (obj.expandAll === true) this.formatTreeData(obj.children, level + 1, arr)
        }
      })
      return arr
    },
    expandClick (scope) {
      scope.row.expandAll = !scope.row.expandAll
      this.treeData = this.formatTreeData(this.tableData)
    },
    toggleRowExpansion (...args) {
      this.$refs.commontable.toggleRowExpansion(...args)
    },
    exportCsv (params = {}) {
      if (params.filename) {
        if (params.filename.indexOf('.csv') === -1) {
          params.filename += '.csv'
        }
      } else {
        params.filename = 'table.csv'
      }
      let columns = []
      let datas = []
      if (params.columns && params.data) {
        columns = params.columns
        datas = params.data
      } else {
        columns = this.columns
        if (!('original' in params)) params.original = true
        datas = params.original ? this.tableData : this.list
      }
      const data = ExportCsv.format(columns, datas, params)
      if (params.callback) params.callback(data)
      else ExportCsv.download(params.filename, data)
    },
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
      this.page.pageNum = val
      this.$emit('pageChange', this.page)
    },
    toggleRowSelection (rows, type) {
      this.$nextTick(() => {
        rows.forEach(row => {
          this.$refs.commontable.toggleRowSelection(row, type)
        })
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