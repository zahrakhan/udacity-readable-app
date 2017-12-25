import {CATEGORIES} from '../actions/types'

const initialState = [
    {
        "name": "react",
        "path": "react"
    }, {
        "name": "redux",
        "path": "redux"
    }, {
        "name": "udacity",
        "path": "udacity"
    }
]
export default function categories(state = initialState, action) {
    switch (action.type) {
        case CATEGORIES.LOAD_ALL:
            return action.categories
        default:
            return state
    }
}