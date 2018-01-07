import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Menu} from 'semantic-ui-react'
import {startCase} from 'lodash'

import {fetchCategories} from '../actions'

class CategoriesMenu extends Component {
  componentWillMount = () => {
    this
      .props
      .getCategories()
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
              to={'/' + category.path}
              className='item'>
              {startCase(category.name)}
            </Menu.Item>
          ))}
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