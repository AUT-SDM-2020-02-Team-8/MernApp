import React, { Component } from "react"
import axios from "axios"
import { Container, InputLabel, Button, Grid, TextField, Select, MenuItem } from "@material-ui/core"
import { Link } from "react-router-dom"
import bibtexParse from 'bibtex-parse'
import _ from 'lodash'
import { sePracticeOptions } from './../constants'

let reader

const articleAttrs = [
  'title', 'author', 'journal', 'volume', 'year',
  'number', 'pages', 'doi', 'publisher'
]

const defaultState = articleAttrs.reduce((ac, a) => ({...ac,[a]:''}), {})

class CreateContainer extends Component {
  constructor() {
    super()
    this.state = {
      ...defaultState,
      sePractice: '',
      email: '',
      success: true,
      message: ''
    }
    this.performSubmit = this.performSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.parseFileData = this.parseFileData.bind(this)
  }

  async performSubmit(event) {
    event.preventDefault()
    this.setState({ message: '' })
    let attrsList = articleAttrs
    attrsList.push('email')
    attrsList.push('sePractice')
    const data = _.pick(this.state, attrsList)

    try {
      const res = await axios.post('/api/evidences/create', data)
      this.setState({ ...defaultState, message: res.data.message, success: true })
    } catch (error) {
      this.setState({ message: error.response.data.message, success: false })
    }
  }

  handleInputChange(event) {
    if (event.target.pattern) {
      const regex = new RegExp(event.target.pattern)
      if (event.target.value === '' || regex.test(event.target.value)) {
        this.setState({ [event.target.name]: event.target.value })
      }
    }
    else {
      this.setState({ [event.target.name]: event.target.value })
    }
  }

  parseFileData() {
    const content = reader.result
    const bibtexData = bibtexParse.entries(content)
    const newState = _.mapValues(defaultState, (v, k) => {
      return bibtexData[0][_.toUpper(k)] || ''
    })
    this.setState(newState)
  }

  handleFileChange(file) {
    reader = new FileReader()
    reader.onloadend = this.parseFileData
    reader.readAsText(file)
  }

  handlerNumberInput(event) {
    if (event.keyCode > 31 && event.keyCode !== 127) {
      if (event.keyCode < 48 || event.keyCode > 57) {
        event.preventDefault()
      }
    }
  }

  render() {
    return (
      <Container className='submitPage' maxWidth='sm'>
        <Link to='/'>Back to search</Link>
        <h1>New Article</h1>
        <form onSubmit={this.performSubmit}>
          <Grid className={this.state.success ? 'successMsg' : 'errorMsg'} item xs={12}>{this.state.message}</Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <InputLabel>Bibtex File</InputLabel>
              <input onChange={(e) => this.handleFileChange(e.target.files[0])} type='file' accept="text/plain" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth required
                name='title' label='Title'
                value={this.state.title}
                onChange={this.handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth required
                name='author' label='Author'
                value={this.state.author}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth name='journal' label='Journal'
                value={this.state.journal}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth type='number' name='volume' label='Volume'
                inputProps={{ min: 1, step: 1, onKeyDown: this.handlerNumberInput }}
                value={this.state.volume}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth type='number' name='year' label='Year'
                inputProps={{ min: 1900, step: 1, onKeyDown: this.handlerNumberInput}}
                value={this.state.year}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth type='number' name='number' label='Number'
                inputProps={{ min: 1, step: 1, onKeyDown: this.handlerNumberInput}}
                value={this.state.number}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth name='pages' label='Pages'
                value={this.state.pages}
                inputProps={{ pattern: "^[0-9]+$|^[0-9]+([-]{1,2}|,)[0-9]*$"}}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth name='doi' label='DOI'
                value={this.state.doi}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth name='publisher' label='Publisher'
                value={this.state.publisher}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id='se-practice-select-label'>SE Practice</InputLabel>
              <Select
                fullWidth label='SE Practice'
                labelId='se-practice-select-label'
                name='sePractice'
                value={this.state.sePractice} onChange={this.handleInputChange}
              >
                {Object.keys(sePracticeOptions).map(i => {
                  return <MenuItem key={i} value={i}>{i}&nbsp;</MenuItem>
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth required name='email' label='Email'
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    )
  }
}

export default CreateContainer
