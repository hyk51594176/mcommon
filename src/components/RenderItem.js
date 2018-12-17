export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  name: 'RenderItem',
  render (h, context) {
    const { row, column, index } = context.props
    const node = column.render ? column.render(h, { row, column, $index: index })
      : (column.format ? column.format(row) : row[column.prop])
    return h('span', {
      'class': {
        'word-b': true
      }
    }, [node])
  }
}
