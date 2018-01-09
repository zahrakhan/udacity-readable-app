import {COMMENTS} from './types'
import * as API from '../utils/api'
import uuid from "uuid/v4";

export function fetchAllComments(id) {
    return dispatch => {
        API
            .getPostComments({id})
            .then(comments => dispatch({type: COMMENTS.LOAD_ALL, comments}))
    }
}
export function fetchComment(id) {
    return dispatch => {
        API
            .getComment({id})
            .then(comment => dispatch(loadComment(comment)))
            .catch(error => dispatch(loadComment({error})))
    }
}
export function addComment(comment) {
    return dispatch => {
        API.addComment({
            ...comment,
            id: uuid(),
                timestamp: Date.now()
            })
            .then(comment => dispatch(updateComment(comment)))
            .catch(error => dispatch(updateComment({error})))
    }
}
export function saveComment(comment) {
    return dispatch => {
        API
            .updateComment(comment)
            .then(comment => dispatch(updateComment(comment)))
            .catch(error => dispatch(updateComment({error})))
    }
}
export function deleteComment(id) {
    return dispatch => {
        API
            .deleteComment({id})
            .then(comment => dispatch(removeComment(comment)))
            .catch(error => dispatch(removeComment({error})))
    }
}
export function voteOnComment(id, vote) {
    return dispatch => {
        API
            .voteOnComment({id, vote})
            .then(comment => dispatch(updateComment(comment)))
            .catch(error => dispatch(updateComment({error})))
    }
}

function loadComment(comment) {
    return {type: COMMENTS.LOAD_DETAIL, comment}
}

function updateComment(comment) {
    return {type: COMMENTS.UPDATE, comment}
}
function removeComment(comment) {
    return {type: COMMENTS.DELETE, comment}
}