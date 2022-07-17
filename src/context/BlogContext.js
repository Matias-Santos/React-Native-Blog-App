import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const reducer = ( state, action ) => {
    switch (action.type) {
        /*
        case 'add_blogPost':
            return [...state,
                    {   id: Math.floor(Math.random() * 99999999),
                        title: action.payload.title,
                        content: action.payload.content
                    }]
        */
        case 'delete_blogPost': 
            return state.filter(( blogPost ) => blogPost.id !== action.payload) 
        case 'edit_blogPost': 
            return state.map(( blogPost ) => {
                return blogPost.id === action.payload.id ? action.payload: blogPost
            })
        case 'get_blogPosts':
            return action.payload
        default:
            return state
    }
}

const addBlogPost = ( dispatch ) => {
    return async ( title, content ) => {
        await jsonServer.post('/blogPosts', { title, content })
        // dispatch({ type: 'add_blogPost', payload: { title, content } })
    }
}
const deleteBlogPost = ( dispatch ) => {
    return async ( id ) => {
        await jsonServer.delete(`/blogPosts/${id}`)
        dispatch({ type: 'delete_blogPost', payload: id })
    }
}
const editBlogPost = ( dispatch ) => {
    return async ( id, newTitle, newContent ) => {
        await jsonServer.put(`/blogPosts/${id}`, { title: newTitle, content: newContent })
        dispatch({ type: 'edit_blogPost', payload: { id: id, title: newTitle, content: newContent } })
    }
}

const getBlogPosts = ( dispatch ) => {
    return async () => {
        const response = await jsonServer.get('/blogPosts')
        dispatch({ type: 'get_blogPosts', payload: response.data })
    }
}

export const { Context, Provider } = createDataContext(
    reducer, { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
)