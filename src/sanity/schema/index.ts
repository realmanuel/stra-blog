import category from './category'
import author from './author'
import post from './post'

export const schemaTypes = [
  // Order matters — referenced types must come before referencing types
  category,
  author,
  post,
]