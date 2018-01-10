import {keyBy, omit} from 'lodash'
import {POSTS} from '../actions/types'

const initialState = {
    items: {},
    sortByOrder: 'timestamp'
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
        case POSTS.UPDATE:
            {
                return action.post.error
                    ? {
                        ...state,
                        error: action.post.error
                    }
                    : {
                        ...state,
                        items: {
                            ...state.items,
                            [action.post.id]: action.post
                        }
                    }
            }
        case POSTS.DELETE:
            return {
                ...state,
                items: omit(state.items, action.post.id)
            }
        case POSTS.SORT_ORDER:
            return {
                ...state,
                sortByOrder: action.order
            }
        default:
            return state
    }
}