import {CATEGORIES} from './types'

export function loadCategories(categories = []) {
    type : CATEGORIES.LOAD_ALL,
    categories
}