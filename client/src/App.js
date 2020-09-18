import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"

import { Provider } from "react-redux"
import store from "./store"
import { Container, AppBar, Typography, Toolbar } from "@material-ui/core"
import { styled } from '@material-ui/core/styles'
import SearchContainer from './components/search/SearchContainer'

const BodyContainer = styled(Container)({
  marginTop: '30px'
})

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppBar position='static'>
            <Container>
              <Toolbar>
                <Typography variant="h6">
                  SEER APP TEAM 8 - SDM 2020
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
          <BodyContainer>
            <Route exact path="/" component={SearchContainer} />
          </BodyContainer>
        </Router>
      </Provider>
    );
  }
}
export default App;
