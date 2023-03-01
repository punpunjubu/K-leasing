import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, loggedIn, path, ...rest }) => {
    // console.log(`loggedIn`, loggedIn)
    // const reload = () => window.location.reload();
    return (
        <Route
            path={path}
            {...rest}
            render={props =>
                loggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
            // onEnter={reload}
        />
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
