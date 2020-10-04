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
              <TableCell onClick={() => this.props.sortHandler('title')}>
                Title&nbsp;&nbsp;
                {this.props.sortByColumn === 'title' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
              <TableCell onClick={() => this.props.sortHandler('author')}>
                Author&nbsp;&nbsp;
                {this.props.sortByColumn === 'author' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
              <TableCell onClick={() => this.props.sortHandler('year')}>
                Year&nbsp;&nbsp;
                {this.props.sortByColumn === 'year' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
              <TableCell onClick={() => this.props.sortHandler('recordType')}>
                Type&nbsp;&nbsp;
                {this.props.sortByColumn === 'recordType' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
              <TableCell onClick={() => this.props.sortHandler('journal')}>
                Journal&nbsp;&nbsp;
                {this.props.sortByColumn === 'journal' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
              <TableCell onClick={() => this.props.sortHandler('publisher')}>
                Publisher&nbsp;&nbsp;
                {this.props.sortByColumn === 'publisher' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
              <TableCell onClick={() => this.props.sortHandler('sePractice')}>
                SE Practice&nbsp;&nbsp;
                {this.props.sortByColumn === 'sePractice' ? (this.props.direction < 0 ? <i className={'arrow-up'} /> : <i className={'arrow-down'} />) : ''}
              </TableCell>
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