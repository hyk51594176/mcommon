const pickerOptions = {
  shortcuts: [{
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '昨天',
    onClick (picker) {
      const start = new Date()
      start.setTime(start.getTime() - 1000 * 60 * 60 * 24)
      picker.$emit('pick', [start, start])
    }
  }, {
    text: '最近一周',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近六个月',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一年',
    onClick (picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
      picker.$emit('pick', [start, end])
    }
  }]
}

const createChildren = (h, el, column, valueKey) => {
  const list = column.dataList || column.list || []
  return list.map(item => {
    return h(el, {
      props: {
        ...column,
        label: column.props ? item[column.props.value] : item[valueKey.value]
      },
      key: item[valueKey.label]
    }, column.props ? item[column.props.label] : item[valueKey.label])
  })
}

export default {
  name: 'MItem',
  props: {
    row: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    $index: Number
  },
  data () {
    return {
      isForce: false
    }
  },
  watch: {
    row () {
      if (this.$parent.clearValidate) {
        this.$nextTick(this.$parent.clearValidate)
      }
    }
  },
  computed: {
    componentType () {
      const { el } = this.column
      if (!el) return null
      if (el === 'mSelect' || el === 'MSelect' || el === 'select' || el === 'el-select') {
        return 'm-select'
      } else {
        return el.startsWith('el-') ? el : ('el-' + el)
      }
    },
    valueKey () {
      if (this.column.valueKey) return this.column.valueKey
      return {
        label: 'label',
        value: 'value'
      }
    },
    modelComputed: {
      get () {
        let val = null
        try {
          val = this.getStrFunction(`this.row.${this.column.prop}`)
        } catch (error) {
          this.setRowKey(null)
        }
        if (this.column.type === 'currency' && val) {
          return this.isForce ? val : this.currency(val, this.column.currency, this.column.decimals)
        }
        return val
      },
      set (value) {
        if (this.column.rules) {
          let isNumber = false
          if (Array.isArray(this.column.rules)) {
            isNumber = this.column.rules.some(obj => obj.type === 'number')
          } else {
            isNumber = this.column.rules.type === 'number'
          }
          if (isNumber && !isNaN(value)) value = Number(value)
        }
        if (this.column.type === 'currency') {
          isNaN(value) ? (value = 0) : (value = Number(value))
        }
        try {
          if (this.getStrFunction(`this.row.${this.column.prop}`) === undefined) {
            this.setRowKey(value)
          } else this.getStrFunction(`this.row.${this.column.prop} = value`)
        } catch (error) {
          this.setRowKey(value)
        }
      }
    }
  },
  methods: {
    getStrFunction (str) {
      str = str.replace(/(\.\d)/g, '[$1]').replace(/\.\[/g, '[')
      const Fn = Function
      return new Fn(`return ${str}`).call(this)
    },
    setRowKey (value) {
      if (this.column.prop && this.row) {
        let path = this.column.prop.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
        let arr = path.split('.')
        let firstKey = arr.shift()
        let lastIndex = arr.length - 1
        if (lastIndex >= 0) {
          let emptyObj = this.row[firstKey] || {}
          const val = arr.reduce((x, y, index) => {
            if (index === lastIndex) {
              x[y] = value
              return emptyObj
            }
            if (!x[y])x[y] = {}
            return x[y]
          }, emptyObj)
          this.$set(this.row, firstKey, JSON.parse(JSON.stringify(val)))
        } else {
          this.$set(this.row, firstKey, value)
        }
      }
    },
    getParams () {
      let newObj = {}
      if (this.column.params && typeof this.column.params === 'object') {
        for (let key in this.column.params) {
          let value
          try {
            value = this.getStrFunction(`this.row.${this.column.params[key]}`)
          } catch (err) { }
          newObj[key] = value !== undefined ? value : this.column.params[key]
        }
      }
      return newObj
    },
    getpickerOptions (type, flag) {
      if (type === 'daterange' && flag !== false) {
        return pickerOptions
      }
    },
    currency (value, currency = '¥', decimals = 2) {
      const digitsRE = /(\d{3})(?=\d)/g
      value = parseFloat(value)
      if (!isFinite(value) || (!value && value !== 0)) return ''
      currency = currency != null ? currency : ''
      decimals = decimals != null ? decimals : 2
      const stringified = Math.abs(value).toFixed(decimals)
      const _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
      const i = _int.length % 3
      const head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
      const _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
      const sign = value < 0 ? '-' : ''
      return sign + currency + head +
      _int.slice(i).replace(digitsRE, '$1,') +
      _float
    }
  },
  render (h) {
    const { row, $index, column, modelComputed, componentType, valueKey, getParams } = this
    if (componentType) {
      const placeholder = column.placeholder !== undefined
        ? column.placeholder : column.label
      let listeners = {
        ...(column.listeners || {}),
        input: (val) => {
          this.modelComputed = val
          column.listeners && column.listeners.input && column.listeners.input(val)
        }
      }
      if (column.listeners && column.listeners.currentObj) {
        listeners.currentObj = data => column.listeners.currentObj(data, row, $index)
      }
      let arr = ['m-select', 'el-checkbox-group', 'el-radio-group']
      if (arr.includes(componentType)) {
        let children = componentType !== 'm-select'
          ? createChildren(
            h,
            componentType === 'el-checkbox-group' ? 'el-checkbox' : 'el-radio',
            column,
            valueKey
          ) : null
        return h(componentType, {
          props: {
            ...column,
            placeholder,
            params: componentType === 'm-select' ? getParams(column) : null,
            value: modelComputed
          },
          on: listeners
        }, children)
      } else {
        if (componentType === 'el-input' && column.type === 'currency') {
          listeners.blur = (...args) => {
            this.isForce = false
            column.listeners && column.listeners.blur && column.listeners.blur(...args)
          }
          listeners.focus = (...args) => {
            this.isForce = true
            column.listeners && column.listeners.focus && column.listeners.focus(...args)
          }
        }
        return h(componentType, {
          props: {
            ...column,
            filterable: true,
            value: modelComputed
          },
          attrs: {
            placeholder
          },
          on: listeners
        })
      }
    } else {
      const VNode = typeof column.render === 'function' ? column.render(h, { row, column, $index }) : column.render
      return VNode || h('span', null, column.format ? column.format(row) : modelComputed)
    }
  }
}
