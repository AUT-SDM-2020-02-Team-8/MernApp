import React, { Component } from "react"
import axios from "axios"
import SearchResult from "./SearchResult"
import SearchCriteria from "./SearchCriteria"
import { Container, InputLabel, Button, Select, MenuItem, TextField, Grid } from "@material-ui/core"

class SearchContainer extends Component {
  constructor() {
    super()
    this.state = {
      evidences: [],
      fromYear: '',
      toYear: '',
      query: '',
      direction: 1
    }
    this.performSearch = this.performSearch.bind(this)
    this.handleFromYearChange = this.handleFromYearChange.bind(this)
    this.handleToYearChange = this.handleToYearChange.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.sortBy = this.sortBy.bind(this)
  }

  async performSearch(event) {
    event.preventDefault()
    const queryString = {
      query: this.state.query,
      fromYear: this.state.fromYear,
      toYear: this.state.toYear
    }
    const res = await axios.post('/api/evidences/search', queryString)
    this.setState({
      evidences: res.data
    })
  }

  handleFromYearChange(event) {
    this.setState({ fromYear: event.target.value })
  }

  handleToYearChange(event) {
    this.setState({ toYear: event.target.value })
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value })
  }

  sortBy(column) {
    let newEvidences = [...this.state.evidences]
    newEvidences.sort((a, b) => {
      let compareValue = 0
      if (a[column] > b[column]) {
        compareValue = this.state.direction
      }
      else if (a[column] < b[column]) {
        compareValue = -1 * this.state.direction
      }
      return compareValue;
    })
    this.setState({
      evidences: newEvidences,
      direction: (this.state.direction * -1),
      sortByColumn: column
    })
  }

  render() {
    return (
      <Container>
        <form onSubmit={this.performSearch}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputLabel>Search query</InputLabel>
              <TextField fullWidth value={this.state.query} onChange={this.handleQueryChange}></TextField>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>From Year</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Select fullWidth label='From Year' value={this.state.fromYear} onChange={this.handleFromYearChange}>
                <MenuItem value={''}>&nbsp;</MenuItem>
                {[...Array(10).keys()].map(i => { return <MenuItem key={i} value={2020-i}>{2020-i}</MenuItem> })}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>To Year</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Select fullWidth label='To Year' value={this.state.toYear} onChange={this.handleToYearChange}>
                <MenuItem value={''}>&nbsp;</MenuItem>
                {[...Array(10).keys()].map(i => { return <MenuItem key={i} value={2020-i}>{2020-i}</MenuItem> })}
              </Select>
            </Grid>
            <SearchCriteria />
            <Grid item xs={3}>
              <Button variant="contained" color="primary" type="submit">Search</Button>
            </Grid>
          </Grid>
        </form>
        <SearchResult
          evidences={this.state.evidences}
          sortHandler={this.sortBy}
          sortByColumn={this.state.sortByColumn}
          direction={this.state.direction}
        />
      </Container>
    )
  }
}

export default SearchContainer
