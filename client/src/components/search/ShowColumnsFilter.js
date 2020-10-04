import React, { Component } from "react"
import { Menu, Button, MenuItem, FormControl, FormLabel, FormGroup } from "@material-ui/core"
import ShowColumnCheckbox from './ShowColumnCheckbox'

class ShowColumnsFilter extends Component {
  constructor(props) {
    super()
    this.state = {
      anchorEl: null,
      chosenColumns: Object.keys(props.headerMapping)
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.toggleColumn = this.toggleColumn.bind(this)
  }
  handleClick(event) {
    this.setState({ anchorEl: event.target })
  }

  handleClose() {
    this.setState({ anchorEl: null })
    this.props.showColumns(this.state.chosenColumns)
  }

  toggleColumn(event) {
    let chosenColumns = this.state.chosenColumns
    if (event.target.checked) {
      chosenColumns.push(event.target.name)
    }
    else {
      chosenColumns = this.state.chosenColumns.filter(item => item !== event.target.name)
    }
    this.setState({ chosenColumns: chosenColumns })
  }

  renderCheckBoxes() {
    let checkBoxes = []
    for (const [key, value] of Object.entries(this.props.headerMapping)) {
      checkBoxes.push(<ShowColumnCheckbox
        key={key}
        name={key}
        label={value}
        chosenColumns={this.state.chosenColumns}
        handleChange={this.toggleColumn}
      />)
    }
    return checkBoxes
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>
          Show columns
        </Button>
        <Menu
          id="columnFilterBox"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem>
            <FormControl component="fieldset">
              <FormLabel component="legend">Choose columns to show</FormLabel>
              <FormGroup>{this.renderCheckBoxes()}</FormGroup>
            </FormControl>
          </MenuItem>
        </Menu>
      </div>
    )
  }
}

export default ShowColumnsFilter