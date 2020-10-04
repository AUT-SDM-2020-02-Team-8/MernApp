import React, { Component } from "react"
import { TableRow, TableCell } from "@material-ui/core"

class SearchResultRow extends Component {
  render() {
    let cells = []
    for (const i of this.props.allColumns) {
      if (this.props.chosenColumns.indexOf(i) >= 0) {
        const txt = Array.isArray(this.props.evidence[i]) ? this.props.evidence[i].join(', ') : this.props.evidence[i]
        cells.push(<TableCell key={i}>{txt}</TableCell>)
      }
    }
    return (
      <TableRow>
        {cells}
      </TableRow>
    )
  }
}

export default SearchResultRow