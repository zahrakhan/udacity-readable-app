import {CATEGORIES} from '../actions/types'

export default function categories(state = [], action) {
    switch (action.type) {
        case CATEGORIES.LOAD_ALL:
            return action.categories
        default:
            return state
    }
}