const renderItem = (h, context) => {
  let { columns, noWrap, isMobile, labelWidth } = context.props
  const { model } = context.data.attrs
  if (!isMobile && context.parent.$store) isMobile = context.parent.$store.getters.isMobile
  return columns.map((column, index) => {
    const children = context.slots()[column.prop]
    // (context.children || []).find(obj => obj.data.slot === column.prop)
    return h('el-col', {
      props: {
        span: (isMobile && !noWrap) ? 22 : (column.span || 11)
      },
      key: column.prop
    }, [h('el-form-item', {
      props: {
        labelWidth: !column.label ? '10px' : column.labelWidth || labelWidth,
        ...column
      },
      key: column.prop

    }, [children || h('m-item', {
      props: {
        column,
        row: model,
        index
      }
    })])])
  })
}

export default {
  functional: true,
  props: {
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    noWrap: Boolean,
    labelWidth: {
      type: String,
      default: '100px'
    },
    columns: Array
  },
  name: 'MForm',
  render (h, context) {
    const { formData, labelWidth } = context.props
    context.data.attrs.model = context.data.attrs.model ? context.data.attrs.model : formData
    context.data.attrs.labelWidth = context.data.attrs.labelWidth ? context.data.attrs.labelWidth : labelWidth
    const children = renderItem(h, context)
    return h('el-form', {
      class: {
        'm-form': true
      },
      ...context.data
    }, children)
  }
}
