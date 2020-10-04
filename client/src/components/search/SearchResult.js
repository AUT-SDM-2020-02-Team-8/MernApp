import React, { Component } from "react"
import SearchResultRow from "./SearchResultRow"
import EnhancedTableToolbar from "./EnhancedTableToolbar"
import { TableContainer, Table, TableBody,} from "@material-ui/core"


class SearchResult extends Component {
  render() {
    return (
      <TableContainer>
        <Table>
        <EnhancedTableToolbar  />
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