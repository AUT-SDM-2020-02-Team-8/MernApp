import React, { Component } from "react"
import SearchResultRow from "./SearchResultRow"
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button, Checkbox, FormLabel, FormControl, FormControlLabel, FormGroup, Menu, MenuItem } from "@material-ui/core"

const EnhancedTableToolbar = (props) => {
const [anchorEl, setAnchorEl] = React.useState(null);
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
const handleClose = () => {
    setAnchorEl(null);
  };
const [state, setState] = React.useState({
    year: true,
    type: true,
    journal: true,
    publisher: true,
    SEPractice: true,
    claims: true,
    
  });
const hide = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    var items = document.getElementsByName(event.target.name);
  
    if(event.target.checked){
      for (var j = 0; j < items.length; j++) {
        items[j].style.visibility = 'visible';
    }}else{
      for (var i = 0; i < items.length; i++) {
        items[i].style.visibility = 'hidden';
  }}
  };

const { year, type, journal, publisher, SEPractice, claims } = state;

return(
  
        <TableHead>
          
            <Button onClick={handleClick}>
              Hidden
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem >
              <FormControl component="fieldset">
                <FormLabel component="legend">Hidden column</FormLabel>
                <FormGroup>
                    <FormControlLabel
                      control={<Checkbox checked={year} onChange={hide} name="year" />}
                      label="Year"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={type} onChange={hide} name="type" />}
                      label="Type"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={journal} onChange={hide} name="journal" />}
                      label="Journal"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={publisher} onChange={hide} name="publisher" />}
                      label="Publisher"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={SEPractice} onChange={hide} name="SEPractice" />}
                      label="SE Practice"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={claims} onChange={hide} name="claims" />}
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
);
};
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