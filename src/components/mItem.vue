<template>
  <el-input
    v-if="column.el==='input'"
    v-model="modelComputed"
    v-bind="column" v-on="column.listeners" 
    @keyup.enter.native.stop='inputEnter(column.prop)'
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
    v-else-if="column.el==='select'">
    <el-option v-for="item in column.list" v-if='item.Value' :key="column.props?item[column.props.value]:item.Value" :label="column.Text?item[column.Text]:item.Text" :value="column.bindObj?item:item.Value">
    </el-option>
  </el-select>
  <el-date-picker
    v-model="modelComputed" v-bind="column" v-on="column.listeners"
    :default-time='column.defaultTime||defaultTime'
    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'
    :picker-options="column.pickerOptions||getpickerOptions(column.type,column.isNeedFast)"
    v-else-if="column.el==='date-picker'">
  </el-date-picker>
  <el-input-number v-model="modelComputed" v-bind="column" v-on="column.listeners" v-else-if="column.el==='input-number'" />
  <el-checkbox
    v-model="modelComputed" v-bind="column" v-on="column.listeners"
    v-else-if="column.el==='checkbox'">
    {{column.Text}}
  </el-checkbox>
  <el-checkbox-group v-model="modelComputed" v-bind="column" v-on="column.listeners" v-else-if="column.el==='checkbox-group'">
    <el-checkbox
      :label="column.props?item[column.props.value]:item[valueKey.value]"
      v-for='item in column.dataList' :key='item[valueKey.label]' v-bind="column" >
      {{column.props?item[column.props.label]:item[valueKey.label]}}
    </el-checkbox>
  </el-checkbox-group>
  <el-radio-group v-model="modelComputed" v-else-if="column.el==='radio'" v-bind="column" v-on="column.listeners">
    <el-radio
      :label="column.props?item[column.props.value]:item[valueKey.value]" v-bind="column"
      v-for='item in column.dataList'
      :key='item[valueKey.label]'>
      {{column.props?item[column.props.label]:item[valueKey.label]}}
    </el-radio>
  </el-radio-group>
  <el-cascader
    v-model="modelComputed" v-bind="column" v-on="column.listeners" filterable
    :placeholder='column.placeholder!=undefined?column.placeholder:column.label'
    @active-item-change='btnClick({data:row,column,$event})' v-else-if="column.el==='cascader'">
  </el-cascader>
  <el-switch v-model="modelComputed" v-bind="column" v-on="column.listeners" v-else-if="column.el==='switch'">
  </el-switch>
  <m-select
    v-else-if="column.el==='mSelect'" v-bind="column" v-on="column.listeners" v-model="modelComputed" :params='getParams(column)'></m-select>
  <el-tag :type="column.type" v-else-if="column.el==='tag'">{{modelComputed}}</el-tag>
  <span v-else >{{modelComputed}}</span>
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
  name: 'm-item',
  props: {
    column: Object,
    row: Object
  },
  inheritAttrs: false,
  data () {
    return {
      defaultTime: ['00:00:00', '23:59:59']
    }
  },
  computed: {
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
        } catch (error) { }
        return val
      },
      set (value) {
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
    column: {
      handler (val) {
        this.formatValue()
      },
      deep: true
    },
    row: {
      handler (val) {
        this.formatValue()
      },
      deep: true
    }
  },
  created () {
    this.formatValue()
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
      if (this.column && this.column.el === 'date-picker') {
        if (this.column.type === 'daterange' || this.column.type === 'datetimerange') {
          let arr = this.row[this.column.prop]
          if (!arr) {
            this.row[this.column.prop] = []
          } else if (!Array.isArray(arr)) {
            this.row[this.column.prop] = arr.split(',')
          }
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

    inputEnter (key) {
      if (this.column.listeners && this.column.listeners.inputEnter) return
      this.$emit('inputEnter', key)
    }

  }
}
</script>
