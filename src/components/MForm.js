import createTag from './createTag'
const defaultWidth = '100px'
const createRow = function (h) {
  const { columns = [], elRow } = this.props
  return h('el-row', {
    props: elRow
  }, columns.map(column => createCol.call(this, h, column)))
}

const createCol = function (h, column) {
  let xs = { span: 24 }
  const { noWrap, model, formData, labelWidth } = this.props
  if (noWrap) {
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
  props: {
    formData: Object,
    columns: Array,
    model: Object,
    elRow: Object,
    noWrap: Boolean
  },
  render (h, context) {
    if (context.props.formData) {
      context.data.attrs.model = context.props.formData
    }
    if (!context.data.attrs.labelWidth) {
      context.data.attrs.labelWidth = defaultWidth
    }
    return h('el-form', context.data, [createRow.call(context, h)])
  }
}
