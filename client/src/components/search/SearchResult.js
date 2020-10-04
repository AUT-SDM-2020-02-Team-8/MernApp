import React, { Component } from "react"
import SearchResultRow from "./SearchResultRow"
import ShowColumnsFilter from "./ShowColumnsFilter"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from "@material-ui/core"

const headerMapping = {
  title: 'Title',
  author: 'Author',
  year: 'Year',
  recordType: 'Type',
  journal: 'Journal',
  publisher: 'Publisher',
  sePractice: 'SE Practice',
  claims: 'Claims'
}

class SearchResult extends Component {
  constructor() {
    super()
    this.state = {
      chosenColumns: Object.keys(headerMapping)
    }
    this.showColumns = this.showColumns.bind(this)
  }

  showColumns(newColumns) {
    this.setState({ chosenColumns: newColumns })
  }
  
  render() {
    let headers = []
    for (const [key, value] of Object.entries(headerMapping)) {
      if (this.state.chosenColumns.indexOf(key) >= 0) {
        headers.push(<TableCell key={key} onClick={() => this.props.sortHandler(key)}>
          {value}&nbsp;&nbsp;
          {this.props.sortByColumn === key ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
        </TableCell>)
      }
    }
    return (
      <TableContainer>
        <ShowColumnsFilter headerMapping={headerMapping} showColumns={this.showColumns}/>
        {this.props.evidences.length > 0 &&
          <Table>
            <TableHead>
              <TableRow>{headers}</TableRow>
            </TableHead>
            <TableBody>
              {this.props.evidences.map(evidence => {
                return (
                  <SearchResultRow
                    key={evidence._id}
                    evidence={evidence}
                    chosenColumns={this.state.chosenColumns}
                    allColumns={Object.keys(headerMapping)}
                  />
                )
              })}
            </TableBody>
          </Table>
        }
        
      </TableContainer>
    )
  }
}

export default SearchResult