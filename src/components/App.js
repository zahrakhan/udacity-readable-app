import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import '../App.css'
import CategoriesMenu from './CategoriesMenu'
import Posts from './Posts'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <CategoriesMenu/>
        <Switch>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/:category" component={Posts}/>
        </Switch>
      </div>
    )
  }
}

export default ReadableApp
