import createTag from './createTag'
const defaultWidth = '100px'
const createRow = function (h) {
  const { columns = [], elRow } = this.data.attrs
  return h('el-row', {
    props: elRow
  }, columns.map(column => createCol.call(this, h, column)))
}

const createCol = function (h, column) {
  let xs = { span: 22 }
  const { noWrap, model, formData, labelWidth } = this.data.attrs
  if (noWrap !== undefined) {
    xs = {}
  }
  return h('el-col', {
    props: {
      span: 11,
      xs,
      ...column
    },
    key: column.prop
  }, [h('el-form-item', {
    props: {
      ...column,
      labelWidth: (!column.label && !column.labelWidth) ? '10px' : column.labelWidth || labelWidth
    }
  }, [createTag.call(this, h, {
    column,
    row: model || formData
  })])])
}

export default {
  functional: true,
  name: 'MForm',
  render (h, context) {
    if (context.data.attrs.formData) {
      context.data.attrs.model = context.data.attrs.formData
    }
    if (!context.data.attrs.labelWidth) {
      context.data.attrs.labelWidth = defaultWidth
    }
    if (context.data.attrs) {
      const VNode = h('el-form', context.data, [createRow.call(context, h)])
      return VNode
    } else {
      return null
    }
  }
}
