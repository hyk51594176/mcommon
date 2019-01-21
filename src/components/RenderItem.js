export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    value: [String, Number]
  },
  name: 'RenderItem',
  render (h, context) {
    const { row, column, index, value } = context.props
    const node = column.render ? column.render(h, { row, column, $index: index })
      : (column.format ? column.format(row) : value)
    return h('span', {}, [node])
  }
}
