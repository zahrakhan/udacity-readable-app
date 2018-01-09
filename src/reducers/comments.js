import {keyBy, omit} from 'lodash'
import {COMMENTS} from '../actions/types'

const initialState = {
    items: {}
}

export default function comments(state = initialState, action) {
    switch (action.type) {
        case COMMENTS.LOAD_ALL:
            return {
                ...state,
                items: keyBy(action.comments, 'id')
            }
        case COMMENTS.LOAD_DETAIL:
            return {
                ...state,
                items: keyBy([action.comment], 'id')
            }
        case COMMENTS.UPDATE:
            {
                const {comment} = action
                return comment.error
                    ? {
                        ...state,
                        error: comment.error
                    }
                    : {
                        ...state,
                        items: {
                            ...state.items,
                            [comment.id]: comment
                        }
                    }
            }
        case COMMENTS.DELETE:
            {
                const {id, error} = action.comment
                return error
                    ? {
                        ...state,
                        error: error
                    }
                    : {
                        ...state,
                        items: omit(state.items, id)
                    }
            }

        default:
            return state
    }
}