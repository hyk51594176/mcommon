
import {
  isDiff
} from '../utils/index'
export default {
  name: 'MSelect',
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
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
    multiple: Boolean,
    showMsg: Boolean,
    getList: Function,
    customRender: Function
  },
  // inheritAttrs: false,
  data () {
    return {
      list: [],
      currentValue: '',
      loading: false,
      selectObj: {}
    }
  },
  watch: {
    params (nv, ov) {
      isDiff(nv, ov) && this.pageInit()
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
      this.changeCurrentValue()
      const checkedItem = val.filter((item) => item.checked)
      if (!checkedItem.length || this.currentValue || (Array.isArray(this.currentValue) && this.currentValue.length)) return
      if (this.multiple) {
        this.currentValue = checkedItem.map(item => item[this.valueKey.value])
      } else {
        this.currentValue = checkedItem[0][this.valueKey.value]
      }
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
    changeCurrentValue () {
      if (this.list.length) {
        if (!this.multiple) {
          this.currentValue !== null &&
            this.currentValue !== undefined &&
            this.currentValue !== '' &&
            !this.list.some(obj => obj[this.valueKey.value] === this.currentValue) &&
            (this.currentValue = null)
        } else {
          this.currentValue &&
            this.currentValue.length &&
            (this.currentValue = this.currentValue.filter(id => this.list.some(obj => obj[this.valueKey.value] === id)))
        }
      } else {
        if (this.multiple) {
          this.currentValue = []
        } else {
          this.currentValue = ''
        }
      }
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
      this.getList({ ...this.params, ...otherData }, this.showMsg).then((res) => {
        let data = Array.isArray(res) ? res : (res.data || [])
        this.list = data
        this.$emit('selectList', this.list)
        this.loading = false
      }).catch(err => {
        this.list = []
        this.loading = false
        return Promise.reject(err)
      })
    }

  },
  render (h) {
    const { list, valueKey, multiple, loading, currentValue, remoteMethod, $attrs, $listeners,customRender } = this
    let listeners = {
      ...$listeners,
      clear: remoteMethod,
      input: (val) => {
        this.currentValue = val
        $listeners.input && $listeners.input(val)
      }
    }
    let options = {
      ...$attrs
    }
    delete options.valueKey
    return h('el-select', {
      props: {
        loading: loading,
        value: currentValue,
        loadingText: '加载中',
        filterable: true,
        clearable: true,
        remoteMethod: remoteMethod,
        multiple: multiple,
        ...options
      },
      style: {
        width: '100%'
      },
      on: listeners
    }, [list.map(item => {
      return h('el-option', {
        props: {
          label: item[valueKey.label],
          value: item[valueKey.value],
          disabled: item.disabled
        },
        key: item[valueKey.value]
      },[customRender ? customRender.call(null,h,item) : null])
    })])
  }
}
