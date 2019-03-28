import ExportCsv from '../utils/export-csv'
import createTag from './createTag'
const createDefault = function (h, { scope, column, index }) {
  const { isTree, expandClick, getColumns } = this
  const children = []
  if (scope.row.treeLevel && index === 0) {
    children.push(
      h('span', {
        style: {
          minWidth: `${scope.row.treeLevel * 15}px`
        }
      })
    )
  }
  if (scope.row.expandAll !== undefined && index === 0) {
    children.push(
      h('span', null, [h('i', {
        class: {
          'el-icon-minus': scope.row.expandAll,
          'el-icon-plus': !scope.row.expandAll
        },
        style: {
          cursor: 'pointer',
          fontWeight: 900,
          fontSize: '13px',
          marginRight: '10px'
        },
        on: {
          click: expandClick.bind(null, scope)
        }
      })])
    )
  }
  children.push(createTag.call(this, h, {
    column: getColumns(column, scope),
    row: scope.row,
    $index: scope.$index
  }))
  return h('span', {
    style: {
      display: isTree && index === 0 ? 'flex' : null
    }
  }, children)
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
    border, summarymethod,
    summaryDefault, isShowSummary,
    $listeners,
    $attrs,
    expand,
    isTree,
    selection,
    selectable,
    showNum,
    reserveSelection,
    numTitle,
    numFiexd,
    page,
    columns,
    buttonWidth,
    buttonAlign,
    buttonFixed,
    buttonLabel
  } = this
  const children = []
  if (expand && !isTree) {
    children.push(h('el-table-column', {
      props: {
        type: 'expand'
      },
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
        }
      })
    )
  }
  if (showNum && list.length && !isTree) {
    const getNum = scope => scope.$index + 1 + ((page.pageNum - 1) * page.pageSize)
    children.push(
      h('el-table-column', {
        props: {
          label: numTitle,
          align: 'center',
          width: 60,
          reserveSelection,
          fixed: numFiexd || (columns[0] && columns[0].fixed)
        },
        scopedSlots: {
          default: this.$scopedSlots.mnum ? props => this.$scopedSlots.mnum({ ...props, num: getNum(props) }) : props => getNum(props)
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
      summarymethod: summarymethod || summaryDefault,
      showSummary: isShowSummary,
      ...$attrs
    },
    ref: 'commontable',
    on: eventFun
  }, [].concat(children, this.$children, createTableColumn.call(this, h, columns)))
}

const createpagPination = function (h) {
  const { showPage, isTree, page, pageSizes, layout, cTotal, handleSizeChange, handleCurrentChange } = this
  if (this.$scopedSlots.page) {
    return this.$scopedSlots.page()
  }
  if (showPage && !isTree) {
    return h('el-pagination', {
      props: {
        currentPage: page.pageNum,
        pageSize: page.pageSize,
        pageSizes,
        layout,
        total: cTotal
      },
      on: {
        'size-change': handleSizeChange,
        'current-change': handleCurrentChange
      },
      style: {
        textAlign: 'right'
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
      treeData: this.isTree ? this.formatTreeData(this.tableData) : []
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
    filtetag (column, value, row) {
      if (typeof column.filterMethod === 'function') {
        return column.filterMethod(column, value, row)
      } else {
        return row[column.prop] === value
      }
    }
  },
  render (h) {
    return h('div', null, [
      createTable.call(this, h),
      createpagPination.call(this, h)
    ])
  }
}
