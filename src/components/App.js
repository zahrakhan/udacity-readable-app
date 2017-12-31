import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import '../App.css'
import CategoriesMenu from './CategoriesMenu'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <CategoriesMenu/>
        <Container>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
              <div>Home</div>
            )}/>
            <Route
              exact
              path="/:category"
              render={(props) => (
              <div>Category posts</div>
            )}/>
          </Switch>
        </Container>
      </div>
    )
  }
}

export default ReadableApp
