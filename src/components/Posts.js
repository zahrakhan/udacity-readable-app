import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Segment, Divider, Card, Message, Dropdown} from 'semantic-ui-react'
import {sortBy, keyBy} from 'lodash'

import {fetchPostsByCategory, setPostsSortOrder} from '../actions'
import PostCard from './PostCard'
import {portSortOptions} from '../utils/helper'

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
  handleSortOrderChange = (e, {value}) => {
    this
      .props
      .setSortOrder(value)
  }
  render() {
    const {items, sortByOrder} = this.props.posts
    const sorted_item_keys = Object.keys(items)
    return (
      <Segment basic>
        <Divider horizontal>POSTS</Divider>
        {sorted_item_keys.length
          ? (
            <span>
              <Segment basic>
                Show posts by {' '}
                <Dropdown
                  inline
                  options={portSortOptions}
                  defaultValue={sortByOrder}
                  onChange={this.handleSortOrderChange}/>
              </Segment>
              <Card.Group>
                {sorted_item_keys.map(post_id => (<PostCard key={'post' + post_id} {...items[post_id]}/>))}
              </Card.Group>
            </span>
          )
          : (
            <Message color="red" hidden={sorted_item_keys.length > 0}>No posts found</Message>
          )}
      </Segment>
    )
  }
}

function mapStateToProps({posts}) {
  const {items, sortByOrder} = posts
  return {
    posts: {
      ...posts,
      items: keyBy(sortBy(Object.values(items), sortByOrder).reverse(), 'id')
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostsByCategory: (category) => dispatch(fetchPostsByCategory(category)),
    setSortOrder: (order) => dispatch(setPostsSortOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)