import React, { Component } from "react"
import axios from "axios"
import { Container, InputLabel, Button, Box, TextField, Grid } from "@material-ui/core"


const defaultState = {
  author: '',
  title: '',
  message: '',
  journal: '',
  year: '',

  volume: '',
  number: '',
  pages: '',
  doi: '',

  _type: '',
  _key: '',
}

class CreateContainer extends Component {
  constructor() {
    super()
    this.state = {
      defaultState
    }
    this.performSubmit = this.performSubmit.bind(this)
    this.handleAuthorChange = this.handleAuthorChange.bind(this)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleJournalChange = this.handleJournalChange.bind(this)
    this.handleYearChange = this.handleYearChange.bind(this)
    
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleNumberChange = this.handleNumberChange.bind(this)
    this.handlePagesChange = this.handlePagesChange.bind(this)
    this.handleDoiChange = this.handleDoiChange.bind(this)
    
    this.handleFileChange = this.handleFileChange.bind(this)

    this.fileInput = React.createRef();
  }

  async performSubmit(event) {
    event.preventDefault()

    this.setState({message: ""})

    const data = {
      author: this.state.author,
      title: this.state.title,
      journal: this.state.journal,
      year: this.state.year,
      
      volume: this.state.volume,
      number: this.state.number,
      pages: this.state.pages,
      doi: this.state.doi,

      _type: this.state._type,
      _key: this.state._key,
    }

    

    try {
      
      // const res = await axios.post('http://localhost:8080/api/evidences/create', data)
      const res = await axios.post('/api/evidences/create', data)
      this.setState({
        ...defaultState,
        message: res.data.error || !res.data.success ? res.data.error : "Submitted successfully.",
      })

    } catch (error) {
      try {
        const msg = error.response.data.error 
        if (msg) {
          this.setState({
            message: msg
          })
        } else {
            this.setState({
              message: "Please check your connection"
            })
            
          }
        } catch {
          this.setState({
            message: "Please check your connection"
          })

      }
      
    }
    
  }


  handleAuthorChange(event) {
    this.setState({ author: event.target.value })
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value })
  }

  handleJournalChange(event) {
    this.setState({ journal: event.target.value })
  }

  handleYearChange(event) {
    this.setState({ year: event.target.value })
  }

  handleVolumeChange(event) {
    this.setState({ volume: event.target.value })
  }

  handleNumberChange(event) {
    this.setState({ number: event.target.value })
  }

  handlePagesChange(event) {
    this.setState({ pages: event.target.value })
  }

  handleDoiChange(event) {
    this.setState({ doi: event.target.value })
  }


  async handleFileChange(event) {
    
    const file = this.fileInput.current.files[ 0 ]
    if (!file) return
    
    var reader = new FileReader();

    reader.onload = async event => {

      const text = event.target.result


      try {
        
        // const res = await axios.post( 'http://localhost:8080/api/evidences/parse', {bibtex: text})
        const res = await axios.post( '/api/evidences/parse', {bibtex: text})
        if ( !res.data || res.data.error || res.status !== 200 ) {
          return alert( res.data.error || "Error with file parsing" )
        }

        const author = res.data.author || res.data.AUTHOR
        const title = res.data.title || res.data.TITLE
        const journal = res.data.journal || res.data.JOURNAL
        const year = res.data.year || res.data.YEAR
        
        const volume = res.data.volume || res.data.VOLUME
        const number = res.data.number || res.data.NUMBER
        const pages = res.data.pages || res.data.PAGES
        const doi = res.data.doi || res.data.DOI
        
        const key = res.data.key || res.data.KEY
        const type = res.data.type || res.data.TYPE

        this.setState({
          author, title, journal, year, volume, number, pages, doi, _key: key, _type: type
        })
        



        
      } catch (error) {
        try {
          const msg = error.response.data.error
          if (msg) {
            return alert(msg)
          } else {
            return alert( "Error, please check you connection" )
          }

        } catch {
          return alert( "Error, please check you connection" )
        }

      }

    }
    reader.onerror = error => {
      return alert( "Error with file parsing" )
    } 

    reader.readAsText( file )



  }

  render() {
    return (
      <Container maxWidth='sm'>

        <Box textAlign="center" pb="40px">
          <h1>New Article</h1>  
                   
        </Box>

        <form onSubmit={this.performSubmit}>
          <Box mb="20px">
            <InputLabel>Bibtex File</InputLabel>
            <input onChange={this.handleFileChange} type='file' id='uploadFile' ref={ this.fileInput } accept="text/plain" />
          </Box>
          <Box mb="20px">

            <InputLabel>Author</InputLabel>
            <TextField fullWidth value={ this.state.author } onChange={ this.handleAuthorChange }></TextField>
          </Box>
            
          <Box mb="20px">
            <InputLabel>Title</InputLabel>
            <TextField fullWidth required value={ this.state.title } onChange={ this.handleTitleChange }></TextField>
          </Box>
          
          <Box mb="20px">
            <InputLabel>Journal</InputLabel>
            <TextField  fullWidth value={ this.state.journal } onChange={ this.handleJournalChange }></TextField>
          </Box>
          

          <Box mb="20px">
            <InputLabel>Volume</InputLabel>
            <TextField type="number"   value={ this.state.volume } onChange={ this.handleVolumeChange }></TextField>
          </Box>

          <Box mb="20px">
            <InputLabel>Year</InputLabel>
            <TextField type="number"   value={ this.state.year } onChange={ this.handleYearChange }></TextField>
          </Box>

          <Box mb="20px">
            <InputLabel>Number</InputLabel>
            <TextField type="number"   value={ this.state.number } onChange={ this.handleNumberChange }></TextField>
          </Box>

          <Box mb="20px">
            <InputLabel>Pages</InputLabel>
            <TextField type="text"   value={ this.state.pages } onChange={ this.handlePagesChange }></TextField>
          </Box>

          <Box mb="20px">
            <InputLabel>DOI</InputLabel>
            <TextField fullWidth value={ this.state.doi } onChange={ this.handleDoiChange }></TextField>
          </Box>



          {this.state.message && 

          <Box mb="20px" p='10px' style={{background: "#dedede"}}>

            { this.state.message }
          </Box>
          
          }

          <table>
            <tr>
              <td><Button  variant="contained" color="primary" type="submit">Submit</Button></td>
              <td><Button  variant="contained" color="primary" type="button" onclick="window.location.href='./button-links.php'">Cancel</Button></td>
            </tr>
          </table>
          <Grid item xs={ 3 } >
            <div style={{marginBottom: "50px"}}>
              
              
            </div>
          </Grid>


        </form>

      </Container>
    )
  }
}

export default CreateContainer
