import React from 'react'
import { Route, Link } from 'react-router-dom'

export let LoginLink = ({children}) =>
    <Link to="/account/login">{children || 'Sign in'}</Link>

export let SignupLink = ({children}) =>
    <Link to="/account/signup">{children || 'Sign up'}</Link>

export let AccountLink = ({children}) =>
    <Link to="/account">{children || 'Profile'}</Link>



    // this below doesn't work, for some reason

// export let SignupRoute = ({component}) =>
//     <Route exact path="/signup" component={component}/>

// export let LoginRoute = ({component}) =>
//     <Route exact path="/login" component={component}/>
