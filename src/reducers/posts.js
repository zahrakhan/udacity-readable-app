import {keyBy} from 'lodash'
import {POSTS} from '../actions/types'

const initialState = {
    items: {}
}

export default function posts(state = initialState, action) {
    switch (action.type) {
        case POSTS.LOAD_ALL:
            return {
                ...state,
                items: keyBy(action.posts, 'id')
            }
        case POSTS.LOAD_DETAIL:
            return {
                ...state,
                items: keyBy([action.post], 'id')
            }
        default:
            return state
    }
}