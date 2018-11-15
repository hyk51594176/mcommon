export default {
  props: {
    row: Object,
    column: Object,
    index: Number
  },
  render (h) {
    return <div>
      { this.column.render ? this.column.render.call(this, h, { row: this.row, column: this.column, $index: this.index })
        : (this.column.format ? this.column.format(this.row) : this.row[this.column.prop])
      }
    </div>
  }
}
