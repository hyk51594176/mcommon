<template>
  <el-input
    v-if="componentType==='el-input'"
    v-model="modelComputed"
    v-bind="column" v-on="column.listeners"
     @blur="isForce=false" @focus='isForce=true'
    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'>
    <div v-if="column.append" slot="append" :class="column.appendClass">
      <slot :name="column.prop+'_append'">
        <div @click='btnClick({data:row,column,$event})'>
          <i :class="column.appendIcon"></i> {{column.appendText}}
        </div>
      </slot>
    </div>
  </el-input>
  <el-select
    v-model="modelComputed"
    v-bind="column" v-on="column.listeners"
    filterable
    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'
    v-else-if="componentType==='el-select'">
    <el-option v-for="item in column.list"  :key="column.props?item[column.props.value]:item.Value" :label="column.Text?item[column.Text]:item.Text" :value="column.bindObj?item:item.Value">
    </el-option>
  </el-select>
  <el-date-picker
    v-model="modelComputed" v-bind="column" v-on="column.listeners"
    :default-time='defaultTime'
    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'
    :picker-options="column.pickerOptions||getpickerOptions(column.type,column.isNeedFast)"
    v-else-if="componentType==='el-date-picker'">
  </el-date-picker>
  <el-input-number v-model="modelComputed" v-bind="column" v-on="column.listeners" v-else-if="componentType==='el-input-number'" />
  <el-checkbox
    v-model="modelComputed" v-bind="column" v-on="column.listeners"
    v-else-if="componentType==='el-checkbox'">
    {{column.Text}}
  </el-checkbox>
  <el-checkbox-group v-model="modelComputed" v-bind="column" v-on="column.listeners" v-else-if="componentType==='el-checkbox-group'">
    <el-checkbox
      :label="column.props?item[column.props.value]:item[valueKey.value]"
      v-for='item in column.list' :key='item[valueKey.label]' v-bind="column" >
      {{column.props?item[column.props.label]:item[valueKey.label]}}
    </el-checkbox>
  </el-checkbox-group>
  <el-radio-group v-model="modelComputed" v-else-if="componentType==='el-radio'" v-bind="column" v-on="column.listeners">
    <el-radio
      :label="column.props?item[column.props.value]:item[valueKey.value]" v-bind="column"
      v-for='item in column.list'
      :key='item[valueKey.label]'>
      {{column.props?item[column.props.label]:item[valueKey.label]}}
    </el-radio>
  </el-radio-group>
  <el-cascader
    v-model="modelComputed" v-bind="column" v-on="column.listeners" filterable
    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'
    @active-item-change='btnClick({data:row,column,$event})' v-else-if="componentType==='el-cascader'">
  </el-cascader>
  <el-switch v-model="modelComputed" v-bind="column" v-on="column.listeners" v-else-if="componentType==='el-switch'">
  </el-switch>
  <m-select
    v-else-if="componentType==='m-select'" v-bind="column" v-on="column.listeners" v-model="modelComputed" :params='getParams(column)'></m-select>
    <render-item v-else :row="row" :column='column' :index="index"/>
</template>
<script>
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
export default {
  name: 'MItem',
  props: {
    index: {
      type: Number,
      default: 0
    },
    column: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  inheritAttrs: false,
  data () {
    return {
      isForce: false
    }
  },
  computed: {
    componentType () {
      const { el } = this.column
      if (!el) return null
      if (el === 'mSelect' || el === 'MSelect') {
        return 'm-select'
      } else {
        return el.startsWith('el-') ? el : ('el-' + el)
      }
    },
    defaultTime () {
      if (this.column.defaultTime) return this.column.defaultTime
      if (this.column.type === 'daterange' || this.column.type === 'datetimerange') return ['00:00:00', '23:59:59']
      return '00:00:00'
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
          console.error(error)
        }
        if (this.column.type === 'currency') {
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
  watch: {
    'column.type': 'formatValue',
    'column.multiple': 'formatValue'
  },
  methods: {
    getStrFunction (str) {
      const Fn = Function
      return new Fn(`return ${str}`).call(this)
    },
    setRowKey (value) {
      if (this.column.prop && this.row) {
        let arr = this.column.prop.split('.')
        let firstKey = arr.shift()
        let lastIndex = arr.length - 1
        let emptyObj = lastIndex < 0 ? value : (this.row[firstKey] || {})
        const val = arr.reduce((x, y) => {
          if (arr.indexOf(y) === lastIndex) {
            emptyObj[y] = value
            return emptyObj
          } else emptyObj[y] = {}
          return emptyObj[y]
        }, emptyObj)
        this.$set(this.row, firstKey, val)
      }
    },
    formatValue () {
      if (this.column.el === 'date-picker' || this.column.el === 'mSelect') {
        let obj = this.row[this.column.prop]
        if (this.column.type === 'daterange' || this.column.type === 'datetimerange' || this.column.multiple) {
          if (!obj) {
            this.row[this.column.prop] = []
          } else if (!Array.isArray(obj)) {
            this.row[this.column.prop] = obj.split(',')
          }
        } else {
          if (Array.isArray(obj)) this.row[this.column.prop] = obj[0] ? obj[0] : null
        }
      }
    },
    getParams (obj) {
      let newObj = {}
      if (obj.params && typeof obj.params === 'object') {
        for (let key in obj.params) {
          let value
          try {
            value = this.getStrFunction(`this.row.${obj.params[key]}`)
          } catch (err) { }
          newObj[key] = value !== undefined ? value : obj.params[key]
        }
      }
      return newObj
    },
    getpickerOptions (type, flag) {
      if (type === 'daterange' && flag !== false) {
        return pickerOptions
      }
    },
    currentObj (data, key) {
      if (this.column.listeners && this.column.listeners.currentObj) return
      this.$emit('currentObj', data, key)
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
  }
}
</script>
