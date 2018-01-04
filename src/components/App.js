import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import '../App.css'
import CategoriesMenu from './CategoriesMenu'
import Posts from './Posts'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <CategoriesMenu/>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/:category" component={Posts}/>
      </div>
    )
  }
}

export default ReadableApp
