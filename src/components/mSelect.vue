<template>
  <el-select class="m-select"
    v-model="currentValue"
    :loading='loading'
    loading-text="加载中"
    :filterable='filterable'
    :clearable='clearable'
    :remote-method='remoteMethod'
    :multiple='multiple'
    @clear='remoteMethod'
    v-on='$listeners'
    v-bind="$attrs">
    <el-option
      v-for="item in list"
      :key="item[valueKey.value]"
      :label="item[valueKey.label]"
      :value="item[valueKey.value]"
      :disabled="item.disabled">
    </el-option>
  </el-select>
</template>

<script>

export default {
  name: 'm-select',
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    },
    filterable: {
      type: Boolean,
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    valueKey: {
      type: Object,
      default () {
        return {
          label: 'label',
          value: 'value'
        }
      }
    },
    nullRequest: Boolean,
    value: {
      type: [String, Boolean, Number, Array],
      default: ''
    },
    dataList: Array,
    isDefault: Boolean,
    multiple: Boolean,
    showMsg: Boolean,
    getList: Function
  },
  inheritAttrs: false,
  data () {
    return {
      list: [],
      currentValue: '',
      loading: false,
      selectObj: {}
    }
  },
  watch: {
    params: {
      handler (nv, ov) {
        if (!nv) return
        if (!ov) {
          this.pageInit()
        } else {
          let flag = Object.keys(nv).some(key => nv[key] !== ov[key])
          if (flag) {
            this.multiple ? this.currentValue = [] : this.currentValue = null
            this.pageInit()
          }
        }
      },
      deep: true
    },
    value (v) {
      this.setCurrentValue()
    },
    currentValue (v) {
      this.$emit('input', v)
      this.getCurrentObj()
    },
    dataList (val) {
      this.list = val
    },
    list (val) {
      if (this.isDefault && val.length) {
        if (!this.currentValue) {
          this.currentValue = val[0][this.valueKey.value]
        }
      }
      const checkedItem = val.filter((item) => item.checked)
      if (!checkedItem.length || this.currentValue || (Array.isArray(this.currentValue) && this.currentValue.length)) return
      if (this.multiple) {
        this.currentValue = checkedItem.map(item => item[this.valueKey.value])
      } else {
        this.currentValue = checkedItem[0][this.valueKey.value]
      }
      this.getCurrentObj()
    }
  },
  created () {
    this.setCurrentValue()
    if (this.dataList) {
      this.list = this.dataList || []
      return
    }
    if (this.dataList && this.currentValue) this.getCurrentObj()
    if (this.params) {
      this.pageInit()
    }
  },
  methods: {
    setCurrentValue () {
      if (this.multiple) {
        if (Array.isArray(this.value)) {
          this.currentValue = this.value
        } else if (typeof this.value === 'string' && this.value) {
          this.currentValue = this.value.split(',')
        } else this.currentValue = []
      } else this.currentValue = this.value
    },
    pageInit () {
      const arr = Object.keys(this.params)
      if (arr.length) {
        let flag = arr.some(o => this.params[o] === null)
        if (flag && !this.nullRequest) return
      }
      this.getData()
    },
    getCurrentObj () {
      if (!this.list.length) return
      let currentObj = null
      let key = this.valueKey.value
      if (!this.multiple) {
        if (!this.currentValue) {
          currentObj = {}
        } else {
          currentObj = this.list.find(obj => obj[key] === this.currentValue) || {}
        }
      } else {
        currentObj = []
        this.currentValue.forEach(id => {
          let obj = this.list.find(obj => obj[key] === id)
          if (obj) currentObj.push(obj)
        })
      }
      this.selectObj = currentObj
      this.$emit('currentObj', currentObj)
    },
    remoteMethod (query) {
      if (this.$attrs.remote !== undefined && this.$attrs.remote !== false && this.$attrs.remote !== null) {
        this.getData({ keyWord: query })
      }
    },
    getData (otherData = {}) {
      if (!this.getList) return
      this.loading = true
      this.getList({ ...this.params, ...otherData }, this.showMsg).then(({ data = [] }) => {
        if (data.length) {
          if (!this.multiple) {
            if (this.currentValue) {
              let flag = data.some(obj => obj[this.valueKey.value] === this.currentValue)
              if (!flag) {
                this.currentValue = ''
              }
            }

            if (!this.currentValue && this.isDefault) {
              this.currentValue = data[0][this.valueKey.value]
            }
          }
        }
        this.list = data
        this.getCurrentObj()
        this.$emit('selectList', this.list)
        this.loading = false
      }).catch(err => {
        this.loading = false
        return Promise.reject(err)
      })
    }
  }
}
</script>
