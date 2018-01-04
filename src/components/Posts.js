import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Divider, Card, Message} from 'semantic-ui-react'

import {fetchPostsByCategory} from '../actions'
import PostCard from './PostCard'

class Posts extends Component {
  componentWillReceiveProps = (newProps) => {
    const {
      match: {
        params: {
          category
        }
      }
    } = newProps
    if (category !== this.props.match.params.category) {
      this
        .props
        .getPostsByCategory(category)
    }
  }
  componentDidMount = () => {
    this
      .props
      .getPostsByCategory(this.props.match.params.category)
  }
  render() {
    const {posts} = this.props
    const posts_key_list = Object.keys(posts.items);
    return (
      <Segment basic>
        <Divider/>
        <Divider horizontal>POSTS</Divider>
        <Message color="red" hidden={posts_key_list.length > 0}>No posts found</Message>
        <Card.Group>
          {posts_key_list.map(post_id => (<PostCard key={'post' + post_id} {...posts.items[post_id]}/>))}
        </Card.Group>
      </Segment>
    )
  }
}

function mapStateToProps({posts}) {
  return {posts}
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: (category) => dispatch(fetchPostsByCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)