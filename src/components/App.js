import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import '../App.css'
import CategoriesMenu from './CategoriesMenu'
import Posts from './Posts'
import PostItem from './PostItem'
import PostForm from './PostForm'
import {NoMatchFound} from './NoMatchFound'

class ReadableApp extends Component {
  render() {
    return (
      <div>
        <CategoriesMenu/>
        <Switch>
          <Route exact path="/" component={Posts}/>
          <Route exact path="/new" component={PostForm}/>
          <Route exact path="/:category/posts" component={Posts}/>
          <Route exact path="/:category/:postId" component={PostItem}/>
          <Route exact path="/:category/:postId/:mode" component={PostForm}/>
          <Route exact path="*" component={NoMatchFound}/>
        </Switch>
      </div>
    )
  }
}

export default ReadableApp
