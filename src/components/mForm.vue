<template>
  <el-form class="coustm" :model="formData" ref='ruleForm' :label-width="labelWidth" v-bind="$attrs">
    <el-col :span="nowrap? 22:(column.span||11)" v-for="column in columns" :key='column.prop'>
      <el-form-item v-bind="column" :label-width="!column.label?'10px':column.labelWidth||labelWidth">
        <slot :name='column.prop' :column='column'>
          <m-item :column='column' @btnClick='btnClick' @currentObj='currentObj' @selectList='selectList'
                 :row='formData' @inputChange='inputChange' @inputEnter='inputEnter'>
            <template v-if='column.el==="input"&&column.append&&column.appendCustom' :slot="column.prop+'_append'">
              <slot :name="column.prop+'_append'"></slot>
            </template>
          </m-item>
        </slot>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
export default {
  name:'m-form',
  props: {
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    nowrap: Boolean,
    labelWidth: {
      type: String,
      default: '100px'
    },
    columns: Array,
    size: String,
  },
  watch: {
    formData (v, ov) {
      if (v !== ov) this.$nextTick(_ => this.clearValidate())
    }
  },
  
  methods: {
    validate (fn) {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.validate(fn)
    },
    resetFields () {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.resetFields()
    },
    validateField (prop, fn) {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.validateField(prop, fn)
    },
    clearValidate (propsArr) {
      if (this.$refs.ruleForm) return this.$refs.ruleForm.clearValidate(propsArr)
    },
    btnClick (obj) {
      this.$emit('btnClick', obj)
    },
    currentObj (data, key) {
      this.$emit('currentObj', data, key)
    },
    inputChange (data, key) {
      this.$emit('inputChange', data, key)
    },
    inputEnter (key) {
      this.$emit('inputEnter', key)
    },
    selectList (data, key) {
      this.$emit('selectList', data, key)
    }
  }
}
</script>
<style>
.el-form {
  width: 100%;
  display: flex;
  flex-wrap: wrap
}
</style>
