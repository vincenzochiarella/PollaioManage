import React from 'react'
import { isAuthenticated } from '../../controllers/UserController'

import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} component={
            (props) => {
                if (isAuthenticated())
                    return <Component {...props} />
                else {
                    return <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                        }
                    }} />
                }
            }
        } />
    )
}
