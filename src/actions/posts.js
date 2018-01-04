import {POSTS} from './types'
import * as API from '../utils/api'

export function fetchPostsByCategory (category) {
    return dispatch =>{
        API.getPostsByCategory(category)
        .then(
            posts => dispatch({
                type: POSTS.LOAD_ALL,
                posts
            })
        )
    }
}