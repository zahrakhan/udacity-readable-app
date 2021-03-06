import {POSTS} from './types'
import * as API from '../utils/api'
import uuid from "uuid/v4";

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
export function addPost(post) {
    return dispatch => {
        API.addPost({
            ...post,
            id: uuid(),
                timestamp: Date.now()
            })
            .then(post => dispatch(updatePost(post)))
            .catch(error => dispatch(updatePost({error})))
    }
}
export function savePost(post) {
    return dispatch => {
        API
            .updatePost(post)
            .then(post => dispatch(updatePost(post)))
            .catch(error => dispatch(updatePost({error})))
    }
}
export function deletePost(id) {
    return dispatch => {
        API
            .deletePost(id)
            .then(post => dispatch(removePost(post)))
            .catch(error => dispatch(removePost({error})))
    }
}
export function voteOnPost(id, vote) {
    return dispatch => {
        API
            .voteOnPost({id, vote})
            .then(post => dispatch(updatePost(post)))
            .catch(error => dispatch(updatePost({error})))
    }
}

export function setPostsSortOrder(order) {
    return dispatch => dispatch({type: POSTS.SORT_ORDER, order})
}

const loadPost = (post) => {
    return {type: POSTS.LOAD_DETAIL, post}
}
const updatePost = (post) => {
    return {type: POSTS.UPDATE, post}
}
const removePost = (post) => {
    return {type: POSTS.DELETE, post}
}