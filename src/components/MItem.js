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

    return h(
      el,
      {
        props: {
          ...column,
          label: column.props ? item[column.props.value] : item[valueKey.value]
        },
        key: item[valueKey.label]
      },
      children
    )
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
  data() {
    return {
      isForce: false
    }
  },
  watch: {
    row(ov, nv) {
      if (this.$parent.clearValidate && ov !== nv) {
        this.$nextTick(this.$parent.clearValidate)
      }
    }
  },
  computed: {
    computedColumn() {
      return {
        ...this.column,
        ...((this.column.getColumn && this.column.getColumn(this.row)) || {})
      }
    },
    componentType() {
      const { el } = this.computedColumn
      if (!el) return null
      if (el === 'mSelect' || el === 'MSelect' || el === 'select' || el === 'el-select') {
        return 'm-select'
      } else {
        return el.startsWith('el-') ? el : 'el-' + el
      }
    },
    valueKey() {
      if (this.computedColumn.valueKey) return this.computedColumn.valueKey
      return {
        label: 'label',
        value: 'value'
      }
    },
    modelComputed: {
      get() {
        let val = null
        try {
          val = this.getStrFunction(`this.row.${this.column.prop}`)
        } catch (error) {
          this.setRowKey(null)
        }
        if (this.column.type === 'currency') {
          return this.isForce ? val : currency(val, this.column.currency, this.column.decimals)
        }
        return val
      },
      set(value) {
        const { type, trim, nullString = true } = this.computedColumn
        if (type === 'currency' || type === 'number') {
          const reg = /^-?[0-9]*\.?\d*$/g
          if (!reg.test(value)) {
            value = value.substr(0, value.length - 1)
          }
        }
        if (this.componentType === 'el-input') {
          if (trim) value = value.trim()
          if (nullString && value === '') value = null
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
    getStrFunction(str) {
      str = str.replace(/(\.\d)/g, '[$1]').replace(/\.\[/g, '[')
      const Fn = Function
      return new Fn(`return ${str}`).call(this)
    },
    setRowKey(value) {
      if (this.computedColumn.prop && this.row) {
        const path = this.computedColumn.prop.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '')
        const arr = path.split('.')
        const firstKey = arr.shift()
        const lastIndex = arr.length - 1
        if (lastIndex >= 0) {
          const emptyObj = this.row[firstKey] || {}
          const val = arr.reduce((x, y, index) => {
            if (index === lastIndex) {
              x[y] = value
              return emptyObj
            }
            if (!x[y]) x[y] = {}
            return x[y]
          }, emptyObj)
          this.$set(this.row, firstKey, JSON.parse(JSON.stringify(val)))
        } else {
          this.$set(this.row, firstKey, value)
        }
      }
    },
    getParams() {
      const newObj = {}
      if (this.computedColumn.params && typeof this.computedColumn.params === 'object') {
        for (const key in this.computedColumn.params) {
          let value
          try {
            value = this.getStrFunction(`this.row.${this.computedColumn.params[key]}`)
          } catch (err) {}
          newObj[key] = value !== undefined ? value : this.computedColumn.params[key]
        }
      }
      return newObj
    }
  },
  render(h) {
    const { row, column, $index, computedColumn, modelComputed, componentType, valueKey, getParams } = this
    if (componentType) {
      const placeholder = computedColumn.placeholder !== undefined ? computedColumn.placeholder : computedColumn.label
      const listeners = {
        ...(computedColumn.listeners || {}),
        input: val => {
          this.modelComputed = val
          computedColumn.listeners && computedColumn.listeners.input && computedColumn.listeners.input(val)
        }
      }
      if (computedColumn.listeners && computedColumn.listeners.currentObj) {
        listeners.currentObj = data => computedColumn.listeners.currentObj(data, row, $index)
      }
      const arr = ['m-select', 'el-checkbox-group', 'el-radio-group']
      if (arr.includes(componentType)) {
        let str = ''
        if (computedColumn.type === 'button') {
          str = '-button'
        }
        const children =
          componentType !== 'm-select' ? createChildren(h, componentType === 'el-checkbox-group' ? `el-checkbox${str}` : `el-radio${str}`, computedColumn, valueKey) : null
        return h(
          componentType,
          {
            props: {
              ...computedColumn,
              placeholder,
              params: componentType === 'm-select' ? getParams(computedColumn) : null,
              value: modelComputed,
              customRender: computedColumn.slots && computedColumn.slots.default ? computedColumn.slots.default : null
            },
            attrs: componentType === 'm-select' ? computedColumn : null,
            on: listeners
          },
          children
        )
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
        const slots = computedColumn.slots || {}
        const children = []
        const scopedSlots = {}
        Object.keys(slots).forEach(key => {
          if (typeof slots[key] === 'function') {
            scopedSlots[key] = slots[key].bind(null, h)
          } else {
            children.push(
              h(
                'template',
                {
                  slot: key
                },
                [slots[key]]
              )
            )
          }
        })
        const attrs = attributes.reduce(
          (obj, key) => {
            if (this.computedColumn[key]) obj[key] = this.computedColumn[key]
            return obj
          },
          { placeholder }
        )
        return h(
          componentType,
          {
            props: {
              filterable: true,
              ...computedColumn,
              value: modelComputed,
              columnOptions: computedColumn,
              label: componentType === 'el-checkbox' || componentType === 'el-radio' ? null : computedColumn.label
            },
            attrs: attrs,
            scopedSlots,
            on: listeners
          },
          children
        )
      }
    } else {
      const VNode = typeof computedColumn.render === 'function' ? computedColumn.render(h, { row, computedColumn, $index }) : computedColumn.render
      return (
        VNode ||
        h(
          'span',
          {
            class: 'item-container',
            style: {
              'word-break': 'break-all'
            }
          },
          computedColumn.format ? computedColumn.format(row) : modelComputed
        )
      )
    }
  }
}
