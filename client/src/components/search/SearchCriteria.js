import React, { Component } from "react"
import { Grid } from "@material-ui/core"
import SearchRow from "./SearchRow"

class SearchCriteria extends Component {
  constructor() {
    super()
    this.state = {
      criteria: [],
      counter: 0
    }
    this.addSearchRow = this.addSearchRow.bind(this)
    this.removeSearchRow = this.removeSearchRow.bind(this)
  }

  componentDidMount(){
    this.addSearchRow()
  }

  addSearchRow() {
    this.setState({
      criteria: [...this.state.criteria, <SearchRow key={this.state.counter} counter={this.state.counter} addSearchRow={this.addSearchRow} removeSearchRow={this.removeSearchRow} />],
      counter: this.state.counter + 1
    })
  }

  removeSearchRow(counter) {
    const newCriteria = this.state.criteria.filter(criteria => criteria.key !== counter.toString())
    if (newCriteria.length > 0) {
      this.setState({
        criteria: newCriteria
      })
    }
  }
  
  render() {
    return (
      <Grid item xs={12}>
        {this.state.criteria}
      </Grid>
    )
  }
}

export default SearchCriteria