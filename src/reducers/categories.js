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
        default:
            return state
    }
}