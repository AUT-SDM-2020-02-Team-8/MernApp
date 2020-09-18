import React, { Component } from "react"
import SearchResultRow from "./SearchResultRow"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

class SearchResult extends Component {
  render() {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Journal</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>SE Practice</TableCell>
              <TableCell>Claims</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.evidences.map(evidence => {
              return ( <SearchResultRow key={evidence._id} evidence={evidence} /> )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
}

export default SearchResult