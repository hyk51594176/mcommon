import { currency } from '@/utils/index'
const attributes = ['maxlength', 'minlenght', 'rows', 'autocomplete', 'name', 'readonly', 'max', 'min', 'step', 'autofocus', 'form']
const createChildren = (h, el, column, valueKey) => {
  const list = column.dataList || column.list || []
  return list.map(item => {
    let children
    if (column.slots && column.slots.default) {
      children = [column.slots.default.call(null, h, item)]
    } else {
      children = item[valueKey.label]
    }

    return h(el, {
      props: {
        ...column,
        label: column.props ? item[column.props.value] : item[valueKey.value]
      },
      key: item[valueKey.label]
    }, children)
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
    row (ov, nv) {
      if (this.$parent.clearValidate && ov !== nv) {
        this.$nextTick(this.$parent.clearValidate)
      }
    }
  },
  computed: {
    computedColumn () {
      return {
        ...this.column,
        ...((this.column.getColumn && this.column.getColumn(this.row)) || {})
      }
    },
    componentType () {
      const { el } = this.computedColumn
      if (!el) return null
      if (el === 'mSelect' || el === 'MSelect' || el === 'select' || el === 'el-select') {
        return 'm-select'
      } else {
        return el.startsWith('el-') ? el : ('el-' + el)
      }
    },
    valueKey () {
      if (this.computedColumn.valueKey) return this.computedColumn.valueKey
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
          return this.isForce ? val : currency(val, this.column.currency, this.column.decimals)
        }
        return val
      },
      set (value) {
        if (this.computedColumn.rules) {
          let isNumber = false
          if (Array.isArray(this.computedColumn.rules)) {
            isNumber = this.computedColumn.rules.some(obj => obj.type === 'number')
          } else {
            isNumber = this.computedColumn.rules.type === 'number'
          }
          if (isNumber && !isNaN(value) && this.componentType === 'el-input') value = Number(value)
        }
        if (this.computedColumn.type === 'currency') {
          isNaN(value) ? (value = 0) : (value = Number(value))
        }
        try {
          if (this.getStrFunction(`this.row.${this.computedColumn.prop}`) === undefined) {
            this.setRowKey(value)
          } else this.getStrFunction(`this.row.${this.computedColumn.prop} = value`)
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
      if (this.computedColumn.prop && this.row) {
        let path = this.computedColumn.prop.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
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
      if (this.computedColumn.params && typeof this.computedColumn.params === 'object') {
        for (let key in this.computedColumn.params) {
          let value
          try {
            value = this.getStrFunction(`this.row.${this.computedColumn.params[key]}`)
          } catch (err) { }
          newObj[key] = value !== undefined ? value : this.computedColumn.params[key]
        }
      }
      return newObj
    }
  },
  render (h) {
    const { row, $index, computedColumn, modelComputed, componentType, valueKey, getParams } = this
    if (componentType) {
      const placeholder = computedColumn.placeholder !== undefined
        ? computedColumn.placeholder : computedColumn.label
      let listeners = {
        ...(computedColumn.listeners || {}),
        input: (val) => {
          if (componentType === 'el-input') {
            this.modelComputed = val.trim()
          } else {
            this.modelComputed = val
          }
          computedColumn.listeners && computedColumn.listeners.input && computedColumn.listeners.input(val)
        }
      }
      if (computedColumn.listeners && computedColumn.listeners.currentObj) {
        listeners.currentObj = data => computedColumn.listeners.currentObj(data, row, $index)
      }
      let arr = ['m-select', 'el-checkbox-group', 'el-radio-group']
      if (arr.includes(componentType)) {
        let str = ''
        if (computedColumn.type === 'button') {
          str = '-button'
        }
        let children = componentType !== 'm-select'
          ? createChildren(
            h,
            componentType === 'el-checkbox-group' ? `el-checkbox${str}` : `el-radio${str}`,
            computedColumn,
            valueKey
          ) : null
        return h(componentType, {
          props: {
            ...computedColumn,
            placeholder,
            params: componentType === 'm-select' ? getParams(computedColumn) : null,
            value: modelComputed,
            customRender: (computedColumn.slots && computedColumn.slots.default) ? computedColumn.slots.default : null
          },
          attrs: componentType === 'm-select' ? computedColumn : null,
          on: listeners
        }, children)
      } else {
        if (componentType === 'el-input' && computedColumn.type === 'currency') {
          listeners.blur = (...args) => {
            this.isForce = false
            computedColumn.listeners && computedColumn.listeners.blur && computedColumn.listeners.blur(...args)
          }
          listeners.focus = (...args) => {
            this.isForce = true
            computedColumn.listeners && computedColumn.listeners.focus && computedColumn.listeners.focus(...args)
          }
        }
        let slots = computedColumn.slots || {}
        let children = []
        let scopedSlots = {}
        Object.keys(slots).forEach(key => {
          let VNode = null
          if (typeof slots[key] === 'function') {
            scopedSlots[key] = slots[key].bind(null, h)
          } else {
            VNode = slots[key]
            VNode.data = {
              ...(VNode.data || {}),
              slot: key
            }
            children.push(VNode)
          }
        })
        let attrs = attributes.reduce((obj, key) => {
          if (this.computedColumn[key]) obj[key] = this.computedColumn[key]
          return obj
        }, { placeholder })
        return h(componentType, {
          props: {
            ...computedColumn,
            filterable: true,
            value: modelComputed,
            columnOptions: computedColumn,
            label: (componentType === 'el-checkbox' || componentType === 'el-radio') ? null : computedColumn.label
          },
          attrs: attrs,
          scopedSlots,
          on: listeners
        }, children)
      }
    } else {
      const VNode = typeof computedColumn.render === 'function' ? computedColumn.render(h, { row, computedColumn, $index }) : computedColumn.render
      if (VNode) return VNode
      else {
        let children = modelComputed
        if (typeof computedColumn.format === 'function') {
          children = computedColumn.format(row)
        } else if (computedColumn.type === 'currency') {
          children = currency(modelComputed, this.column.currency, this.column.decimals)
        }
        return h('span', {
          class: 'item-container',
          style: {
            'word-break': 'break-all',
            'display': 'inline-block'
          }
        }, children)
      }
    }
  }
}
