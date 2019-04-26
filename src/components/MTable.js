import ExportCsv from '@/utils/export-csv'
import createTag from './createTag'
const createDefault = function (h, { scope, column, index }) {
  return h('span', null, [createTag.call(this, h, {
    column: this.getColumns(column, scope),
    row: scope.row,
    $index: scope.$index
  })])
}

const createTableColumn = function (h, columns) {
  const { filtetag, getKey } = this
  return columns.map((column, index) => {
    let children = column.children || []
    return h('el-table-column', {
      props: {
        ...column,
        className: column.className || column.el,
        align: column.align || 'center',
        filterMethod: column.filters ? filtetag.bind(null, column) : null
      },
      key: getKey(column.prop),
      scopedSlots: {
        default: scope => createDefault.call(this, h, { scope, column, index })
      }
    }, createTableColumn.call(this, h, children))
  })
}

const createTable = function (h) {
  const {
    list, stripe,
    border, summaryMethod,
    summaryDefault, isShowSummary,
    $listeners,
    $attrs,
    expand,
    selection,
    selectable,
    showNum,
    reserveSelection,
    numTitle,
    numFiexd,
    numWidth,
    page,
    columns,
    buttonWidth,
    buttonAlign,
    buttonFixed,
    buttonLabel,
    mergeRow,
    mergeColumn,
    arraySpanMethod,
    spanMethod
  } = this
  const children = []
  if (expand) {
    children.push(h('el-table-column', {
      props: {
        type: 'expand'
      },
      key: 'expand',
      scopedSlots: {
        default: this.$scopedSlots.expand ? props => this.$scopedSlots.expand(props) : null
      }
    }))
  }
  if (selection && list.length) {
    children.push(
      h('el-table-column', {
        props: {
          type: 'selection',
          selectable,
          reserveSelection
        },
        key: 'selection'
      })
    )
  }
  if (showNum && list.length) {
    const getNum = scope => scope.$index + 1 + ((page.pageNum - 1) * page.pageSize)
    children.push(
      h('el-table-column', {
        props: {
          label: numTitle,
          align: 'center',
          width: numWidth || 60,
          reserveSelection,
          fixed: numFiexd || (columns[0] && columns[0].fixed)
        },
        key: 'showNum',
        scopedSlots: {
          default: this.$scopedSlots.num ? props => this.$scopedSlots.mnum({ ...props, num: getNum(props) }) : props => getNum(props)
        }
      })
    )
  }
  if (this.$scopedSlots.button) {
    children.push(h('el-table-column', {
      props: {
        width: buttonWidth,
        align: buttonAlign || 'center',
        fixed: buttonFixed,
        label: buttonLabel
      },
      key: 'button',
      scopedSlots: {
        default: props => this.$scopedSlots.button(props)
      }
    }))
  }

  let eventFun = { ...$listeners }
  if (eventFun.selectionChange)eventFun['selection-change'] = eventFun.selectionChange
  return h('el-table', {
    props: {
      data: list,
      border,
      stripe,
      summaryMethod: summaryMethod || summaryDefault,
      showSummary: isShowSummary,
      spanMethod: (mergeRow.length || mergeColumn.length) ? arraySpanMethod : spanMethod,
      ...$attrs
    },
    ref: 'commontable',
    on: eventFun
  }, [].concat(children, this.$slots.default || [], createTableColumn.call(this, h, columns)))
}

const createpagPination = function (h) {
  const { showPage, pageAlign, page, pageSizes, layout, cTotal, handleSizeChange, handleCurrentChange, pageOptions = {}, hideOnSinglePage } = this
  if (this.$scopedSlots.page) {
    return this.$scopedSlots.page()
  }
  if (showPage) {
    return h('el-pagination', {
      props: {
        currentPage: page.pageNum,
        pageSize: page.pageSize,
        pageSizes,
        layout,
        total: cTotal,
        hideOnSinglePage,
        ...pageOptions
      },
      on: {
        'size-change': handleSizeChange,
        'current-change': handleCurrentChange
      },
      style: {
        textAlign: pageAlign
      }
    })
  }
  return null
}
export default {
  name: 'MTable',
  props: {
    tableData: {
      type: Array,
      default () {
        return []
      }
    },
    buttonWidth: [String, Number],
    numWidth: [String, Number],
    buttonAlign: {
      type: String,
      default: 'center'
    },
    pageOptions: Object,
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
    hideOnSinglePage: {
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
    summaryMethod: {
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
          pageSize: 15,
          total: 0
        }
      }
    },
    pageSizes: {
      type: Array,
      default () {
        return [15, 30, 45, 60]
      }
    },
    mergeRow: {
      type: Array,
      default: () => []
    },
    mergeColumn: {
      type: Array,
      default: () => []
    },
    spanMethod: Function,
    sumText: {
      type: String,
      default: '合计'
    },
    pageAlign: {
      type: String,
      default: 'right'
    }
  },
  inheritAttrs: false,

  computed: {
    cTotal () {
      const t = this.total || this.page.total
      if (t) return t
      return this.tableData.length
    },
    list () {
      const t = this.total || this.page.total
      if (!this.showPage || t) {
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
    },
    mergeRowData () {
      if (!this.mergeRow.length) return {}
      return this.mergeRow.reduce((x, y) => {
        let firstIndex
        x[y] = this.list.reduce((l, r, i) => {
          let obj = {
            row: 1,
            [y]: r[y]
          }
          if (i !== 0 && r[y] === l[i - 1][y]) {
            obj.row = 0
            l[firstIndex].row += 1
          } else {
            firstIndex = i
          }
          l.push(obj)
          return l
        }, [])
        return x
      }, {})
    }
  },
  watch: {
    tableData () {
      const count = this.total || this.page.total
      if (!count && isNaN(count)) this.page.pageNum = 1
    }
  },
  methods: {
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
          sums[index] = this.sumText
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
        let prop = column.property
        let obj = prop ? this.columns.find(obj => obj.prop === prop) : null
        if (obj && sums[index]) {
          if (obj.isCurrency) {
            sums[index] = (sums[index] + '').replace(
              /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
              '$&,'
            )
          }
          if (obj.unit)sums[index] = sums[index] + obj.unit
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
    toggleRowSelection (rows = [], type) {
      this.$nextTick(() => {
        rows.forEach(row => {
          this.$refs.commontable.toggleRowSelection(row, type)
        })
      })
    },
    clearSelection () {
      this.$refs.commontable.clearSelection()
    },
    filtetag (column, value, row) {
      if (typeof column.filterMethod === 'function') {
        return column.filterMethod(column, value, row)
      } else {
        return row[column.prop] === value
      }
    },
    arraySpanMethod ({ row, column, rowIndex }) {
      let arr = column.property ? this.mergeRowData[column.property] : null

      let rowspan = 1; let colspan = 1
      if (arr) {
        rowspan = arr[rowIndex].row
      }
      if (this.mergeColumn.length) {
        if (this.mergeColumn.indexOf(column.property) > -1) {
          let props = this.columns.map(obj => obj.prop)
          let index = props.indexOf(column.property)
          let canmerge = true
          colspan = props.reduce((x, y, i) => {
            if (i > index && canmerge) {
              if (row[y] === undefined) {
                x += 1
              } else {
                canmerge = false
              }
            }
            return x
          }, 1)
        } else if (column.property && row[column.property] === undefined) {
          colspan = 0
        }
      }

      return [rowspan, colspan]
    }
  },
  render (h) {
    return h('div', null, [
      createTable.call(this, h),
      createpagPination.call(this, h)
    ])
  }
}
