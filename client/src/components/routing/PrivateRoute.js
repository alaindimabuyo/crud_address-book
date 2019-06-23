import React, { useContext } from 'react'
import AuthContext from "../../context/Auth/AuthContext"
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext)
    const { isAuthenticated, loading } = authContext

    return (
        // if its not authenticated redirect to login page
        <Route {...rest} render={props => !isAuthenticated && !loading ? (
            <Redirect to='/login' />
        ) : (
                <Component {...props} />
            )} />

    )
}

export default PrivateRoute
