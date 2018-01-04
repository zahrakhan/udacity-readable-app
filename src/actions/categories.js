import {CATEGORIES} from './types'
import * as API from '../utils/api'

export function fetchCategories () {
    return dispatch =>{
        API.getCategories()
        .then(
            categories => dispatch({
                type: CATEGORIES.LOAD_ALL,
                categories
            })
        )
    }
}