export default {
  functional: true,
  props: {
    row: Object,
    column: Object,
    index: Number,
    renderItem: [Function, Object],
    format: Function,
    value: [String, Number, Array, Object, Boolean]
  },
  name: 'RenderItem',
  render (h, context) {
    const { row, renderItem, index, value, format, column } = context.props
    const node = typeof renderItem === 'function' ? renderItem(h, { row, column, $index: index }) : renderItem
    const text = (format ? format(row) : value)
    if (node) return node
    return h('span', {}, text)
  }
}
