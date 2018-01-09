import {keyBy} from 'lodash'
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
            return action.comment.error
                ? {
                    ...state,
                    error: action.comment.error
                }
                : {
                    ...state,
                    items : {
                        ...state.items,
                        [action.comment.id]: action.comment
                    }
                }

            default : return state
    }
}