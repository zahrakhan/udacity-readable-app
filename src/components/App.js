import React, {Component} from 'react'
import {Route} from 'react-router-dom'

import '../App.css'
import CategoriesMenu from './CategoriesMenu'
import Posts from './Posts'
import PostDetail from './PostDetail'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <CategoriesMenu/>
        <Route exact path="/" component={Posts}/>
        <Route exact path="/:category" component={Posts}/>
        <Route exact path="/:category/:postId" component={PostDetail}/>
      </div>
    )
  }
}

export default ReadableApp
