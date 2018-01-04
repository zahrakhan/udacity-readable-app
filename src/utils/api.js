const api = process.env.API_URL || "http://localhost:3001"

// Generate a unique token for storing data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () => fetch(`${api}/categories`, {headers})
  .then(res => res.json())
  .then(res => res.categories)

export const getPostsByCategory = (category = 'all') => {
  const selected_category = category === 'all'
    ? ''
    : `/${category}`
  return fetch(`${api}${selected_category}/posts`, {headers}).then(res => res.json())
}

export const addPost = (post) => fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(post)
}).then(res => res.json())

export const voteOnPost = ({id, vote}) => fetch(`${api}/posts/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option: vote})
}).then(res => res.json())

export const updatePost = ({id, title, body}) => fetch(`${api}/posts/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({title, body})
}).then(res => res.json())

export const deletePost = ({id}) => fetch(`${api}/posts/${id}`, {
  method: 'DELETE',
  headers
}).then(res => res.json())

export const getPostComments = ({id}) => fetch(`${api}/posts/${id}/comments`, {headers}).then(res => res.json())

export const addComment = (comment) => fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({comment})
}).then(res => res.json())

export const getComment = ({id}) => fetch(`${api}/comments/${id}`, {headers}).then(res => res.json())

export const voteOnComment = ({id, vote}) => fetch(`${api}/comments/${id}`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({option: vote})
}).then(res => res.json())

export const updateComment = ({id, timestamp, body}) => fetch(`${api}/comments/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({timestamp, body})
}).then(res => res.json())

export const deleteComment = ({id}) => fetch(`${api}/comments/${id}`, {
  method: 'DELETE',
  headers
}).then(res => res.json())
