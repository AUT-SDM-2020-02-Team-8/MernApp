import React, { Component } from "react"
import { TableRow, TableCell } from "@material-ui/core"
import { headerMapping } from './../constants'
import { levelOfSupportMapping } from './../constants'

const allColumns = Object.keys(headerMapping)

class SearchResultRow extends Component {
  displayCell(columnName) {
    if (columnName === 'claims') {
      return this.props.evidence[columnName].join(', ')
    }
    else if (columnName === 'levelOfSupport') {
      return levelOfSupportMapping[this.props.evidence[columnName]]
    }
    else {
      return this.props.evidence[columnName]
    }
  }

  renderCells() {
    let cells = []
    for (const i of allColumns) {
      if (this.props.chosenColumns.indexOf(i) >= 0) {
        cells.push(<TableCell key={i}>{this.displayCell(i)}</TableCell>)
      }
    }
    return cells
  }

  render() {
    return (
      <TableRow>{this.renderCells()}</TableRow>
    )
  }
}

export default SearchResultRow