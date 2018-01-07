import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'
import {startCase} from 'lodash'

import {fetchCategories} from '../actions'

class CategoriesMenu extends Component {
  componentWillMount = () => {
    this
      .props
      .getCategories()
  }
  buildCategoryPath = (path) => {
    return `/${path
      ? `${path}/posts`
      : ''}`
  }
  render() {
    return (
      <Menu>
        {this
          .props
          .categories
          .map((category) => (
            <Menu.Item
              key={category.name}
              as={Link}
              to={this.buildCategoryPath(category.path)}
              className='item'>
              {startCase(category.name)}
            </Menu.Item>
          ))}

        <Menu.Menu position='right'>
          <Menu.Item name='new-post' as={Link} to={'/new'}>
            <Icon name='add'/>
            New Post
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

function mapStateToProps({categories}) {
  return {
    categories: [
      {
        name: 'home',
        path: ''
      },
      ...categories
    ]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesMenu)