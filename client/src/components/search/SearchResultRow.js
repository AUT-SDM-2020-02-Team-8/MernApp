import React, { Component } from "react"
import { TableRow, TableCell } from "@material-ui/core"

class SearchResultRow extends Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.evidence.title}</TableCell>
        <TableCell>{this.props.evidence.author}</TableCell>
        <TableCell>{this.props.evidence.year}</TableCell>
        <TableCell>{this.props.evidence.recordType}</TableCell>
        <TableCell>{this.props.evidence.journal}</TableCell>
        <TableCell>{this.props.evidence.publisher}</TableCell>
        <TableCell>{this.props.evidence.sePractice}</TableCell>
        <TableCell>{this.props.evidence.claims.join(", ")}</TableCell>
      </TableRow>
    )
  }
}

export default SearchResultRow