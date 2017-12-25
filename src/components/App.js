import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import '../App.css'

class ReadableApp extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => (
          <div>readable</div>
        )}/>
      </Switch>
    )
  }
}

export default ReadableApp
