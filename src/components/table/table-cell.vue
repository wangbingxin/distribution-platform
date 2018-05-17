<script>
export default {
  name: 'x-cell',
  props: ['rowData', 'row', 'col', 'cell', 'slotCellC', 'slotCellN', 'slotColC', 'slotColN',],
  render(h) {
    let children
    if (this.slotCellC) {
      children = this.slotCellC({
        rowData: this.rowData,
        col: this.col,
        row: this.row
      })
    } else if (this.slotCellN) {
      children = this.slotCellN
    } else if (this.slotColC) {
      children = this.slotColC({
        rowData: this.rowData,
        col: this.col,
        row: this.row
      })
    } else if (this.slotColN) {
      children = this.slotColN
    } else {
      children = this.cell
    }
    return h('div', {
      class: 'cell',
    }, children)
  }
}
</script>
