import React, { useReducer } from 'react'

export default ( reducer, actions, initialState ) => {
    const Context = React.createContext()

    const Provider = ({ children }) => {
        const [ state, dispatch ] = useReducer( reducer, initialState )
        
        // actions === { addBlogPost: ( dispatch ) => { return () => {} } }
        const boundActions = {}
        for ( let key in actions ) {
            boundActions[key] = actions[key](dispatch)
        }
                                        // state === state: state
        return <Context.Provider value = {{ state, ...boundActions }} >
            { children }
        </Context.Provider>
    }

    return { Context, Provider }
}