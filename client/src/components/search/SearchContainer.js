import React, { Component } from "react"
import axios from "axios"
import SearchResult from "./SearchResult"
import { Container, InputLabel, Button, Select, MenuItem, Grid, Slider, Radio } from "@material-ui/core"
import { Link } from "react-router-dom"
import { sePracticeOptions } from './../constants'

const currentYear = new Date().getFullYear()

class SearchContainer extends Component {
  constructor() {
    super()
    this.state = {
      evidences: [],
      claimedBenefits: [],
      sePractice: '',
      direction: 1,
      yearRange: [2000, currentYear],
      yearOption: '1'
    }
    this.performSearch = this.performSearch.bind(this)
    this.handleSePracticeChange = this.handleSePracticeChange.bind(this)
    this.handleClaimedBenefitsChange = this.handleClaimedBenefitsChange.bind(this)
    this.handleYearRangeChange = this.handleYearRangeChange.bind(this)
    this.handleYearOptionChange = this.handleYearOptionChange.bind(this)
    this.sortBy = this.sortBy.bind(this)
  }

  async performSearch(event) {
    event.preventDefault()
    let yearRange = this.state.yearRange
    if (this.state.yearOption !== '0') {
      yearRange = [currentYear - parseInt(this.state.yearOption) + 1, currentYear]
    }
    const queryString = {
      sePractice: this.state.sePractice,
      claims: this.state.claimedBenefits,
      yearRange: yearRange
    }
    const res = await axios.post('/api/evidences/search', queryString)
    this.setState({
      evidences: res.data
    })
  }

  handleSePracticeChange(event) {
    this.setState({ sePractice: event.target.value, claimedBenefits: [] })
  }

  handleClaimedBenefitsChange(event) {
    this.setState({ claimedBenefits: event.target.value })
  }

  handleYearRangeChange(event, newValue) {
    this.setState({ yearRange: newValue })
  }

  handleYearOptionChange(event) {
    this.setState({ yearOption: event.target.value })
  }

  sortBy(column) {
    let newEvidences = [...this.state.evidences]
    newEvidences.sort((a, b) => {
      const compareValue = a[column] > b[column] ? 1 : (a[column] < b[column] ? -1 : 0)
      return compareValue * this.state.direction
    })
    this.setState({
      evidences: newEvidences,
      direction: (this.state.direction * -1),
      sortByColumn: column
    })
  }

  renderYearRadio() {
    const opts = {
      'This year': 1,
      'Last 3 years': 3,
      'Last 5 years': 5,
      'Custom': 0
    }

    return Object.entries(opts).map(([k, v]) => {
      return (
        <Grid item xs={2} key={k}>
          <InputLabel>{k}</InputLabel>
          <Radio
            checked={this.state.yearOption === v.toString()}
            onChange={this.handleYearOptionChange}
            value={v}
            name="yearOption"
            inputProps={{ 'aria-label': k }}
          />
        </Grid>
      )
    })
  }

  render() {
    return (
      <Container>
        <Link to='/create'>Submit new article</Link>
        <h1>Search</h1>
        <form onSubmit={this.performSearch}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <InputLabel>SE Practice</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Select
                fullWidth label='SE Practice'
                value={this.state.sePractice} onChange={this.handleSePracticeChange}
              >
                {Object.keys(sePracticeOptions).map(i => {
                  return <MenuItem key={i} value={i}>{i}&nbsp;</MenuItem>
                })}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <InputLabel>Claimed Benefits</InputLabel>
            </Grid>
            <Grid item xs={3}>
              <Select
                fullWidth label='Claimed Benefits' multiple={true}
                value={this.state.claimedBenefits} onChange={this.handleClaimedBenefitsChange}
              >
                <MenuItem value={''}>All</MenuItem>
                {sePracticeOptions[this.state.sePractice].map(i => { return <MenuItem key={i} value={i}>{i}</MenuItem> })}
              </Select>
            </Grid>
            {this.renderYearRadio()}
            <Grid item xs={2}>
              <InputLabel>Year {this.state.yearRange.join(' - ')}</InputLabel>
            </Grid>
            <Grid item xs={2}>
              <Slider
                value={this.state.yearRange}
                onChange={this.handleYearRangeChange}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                max={currentYear} min={2000}
                disabled={this.state.yearOption !== '0'}
              />
            </Grid>
            <Grid item xs={2}>
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
