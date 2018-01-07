import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import '../App.css'
import CategoriesMenu from './CategoriesMenu'
import Posts from './Posts'
import PostDetail from './PostDetail'
import PostUpdate from './PostUpdate'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <CategoriesMenu/>
        <Switch>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/new" component={PostUpdate}/>
          <Route exact path="/:category/posts" component={Posts}/>
          <Route exact path="/:category/:postId" component={PostDetail}/>
          <Route exact path="/:category/:postId/:mode" component={PostUpdate}/>
        </Switch>
      </div>
    )
  }
}

export default ReadableApp
