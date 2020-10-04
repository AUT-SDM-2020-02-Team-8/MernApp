import React, { Component } from "react"
import {TableHead, TableRow, TableCell, Button, Checkbox, FormLabel, FormControl, FormControlLabel, FormGroup, Menu, MenuItem } from "@material-ui/core"

class EnhancedTableToolbar extends Component {
    constructor(){
      super()
        this.state = {
            year: true,
            type: true,
            journal: true,
            publisher: true,
            SEPractice: true,
            claims: true,
            anchorEl: null,
            open: false,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.hide = this.hide.bind(this)
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
        if(!this.state.open){
            this.setState({open: true})
        }
    }

    handleClose = () => {
        this.setState({ anchorEl: null});
        if(this.state.open){
            this.setState({open: false})
        }
    }

    hide = (event) => {
      this.setState({ ...this.state, [event.target.name]: event.target.checked });
      var items = document.getElementsByName(event.target.name);
      if(event.target.checked){
        for (var j = 0; j < items.length; j++) {
          items[j].style.visibility = 'visible';
        }
      }else{
        for (var i = 0; i < items.length; i++) {
          items[i].style.visibility = 'hidden';
        }
      }
    }
    
    render() {
        return(
            <TableHead>
                <Button onClick={this.handleClick}>
                Hidden
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={this.anchorEl}
                    keepMounted
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                <MenuItem >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Hidden column</FormLabel>
                            <FormGroup>
                                <FormControlLabel
                                control={<Checkbox checked={this.state.year} onChange={this.hide} name="year" />}
                                label="Year"
                                />
                                <FormControlLabel
                                control={<Checkbox checked={this.state.type} onChange={this.hide} name="type" />}
                                label="Type"
                                />
                                <FormControlLabel
                                control={<Checkbox checked={this.state.journal} onChange={this.hide} name="journal" />}
                                label="Journal"
                                />
                                <FormControlLabel
                                control={<Checkbox checked={this.state.publisher} onChange={this.hide} name="publisher" />}
                                label="Publisher"
                                />
                                <FormControlLabel
                                control={<Checkbox checked={this.state.SEPractice} onChange={this.hide} name="SEPractice" />}
                                label="SE Practice"
                                />
                                <FormControlLabel
                                control={<Checkbox checked={this.state.claims} onChange={this.hide} name="claims" />}
                                label="Claims"
                                />
                            </FormGroup>
                        </FormControl>
                    </MenuItem>
                </Menu>
                <TableRow>
                    <TableCell name="title">Title</TableCell>
                    <TableCell name="author">Author</TableCell>
                    <TableCell name="year">Year</TableCell>
                    <TableCell name="type">Type</TableCell>
                    <TableCell name="journal">Journal</TableCell>
                    <TableCell name="publisher">Publisher</TableCell>
                    <TableCell name="SEPractice">SE Practice</TableCell>
                    <TableCell name="claims">Claims</TableCell>
                </TableRow>
            </TableHead>
        )
    }
}

  export default EnhancedTableToolbar