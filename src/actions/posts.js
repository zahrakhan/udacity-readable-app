import {POSTS} from './types'
import * as API from '../utils/api'

export function fetchPostsByCategory(category) {
    return dispatch => {
        API
            .getPostsByCategory(category)
            .then(posts => dispatch({type: POSTS.LOAD_ALL, posts}))
    }
}
export function fetchPost(id) {
    return dispatch => {
        API
            .getPost(id)
            .then(post => dispatch(loadPost(post)))
            .catch(error => dispatch(loadPost({error})))
    }
}
function loadPost(post) {
    return {type: POSTS.LOAD_DETAIL, post}
}