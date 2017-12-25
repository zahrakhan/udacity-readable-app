import {CATEGORIES, POSTS} from './types'

export function loadCategories(categories = []) {
    type : CATEGORIES.LOAD_ALL,
    categories
}

export function loadPosts(posts = []) {
    type : POSTS.LOAD_ALL,
    posts
}