export default function (h, { column, row = {}, $index }) {
  let VNode = null
  const scopedSlots = this.scopedSlots || this.$scopedSlots
  if (column.prop && scopedSlots[column.prop]) {
    VNode = scopedSlots[column.prop]({ row, column, $index })
  }
  return VNode || h('MItem', {
    props: {
      row,
      column,
      $index
    }
  })
}
