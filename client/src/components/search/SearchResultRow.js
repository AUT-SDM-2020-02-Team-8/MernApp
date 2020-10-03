import React, { Component } from "react"
import { TableRow, TableCell } from "@material-ui/core"

class SearchResultRow extends Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.evidence.title}</TableCell>
        <TableCell>{this.props.evidence.author}</TableCell>
        <TableCell name="year">{this.props.evidence.year}</TableCell>
        <TableCell name="type">{this.props.evidence.recordType}</TableCell>
        <TableCell name="journal">{this.props.evidence.journal}</TableCell>
        <TableCell name="publisher">{this.props.evidence.publisher}</TableCell>
        <TableCell name="SEPractice">{this.props.evidence.sePractice}</TableCell>
        <TableCell name="claims">{this.props.evidence.claims.join(", ")}</TableCell>
      </TableRow>
    )
  }
}

export default SearchResultRow