// will be used to make protected routing
// will accept 'component' prop passed from the ROUTE in App.js ex: <Route exact path='/dashboard' component={Dashboard} />

import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {      //props destructured
    const auth = useSelector(state => state.auth);
    return (
        <Route {...rest} render={
            props => !auth.isAuthenticated && !auth.loading ? (<Redirect to='/login' />) : (<Component {...props} />) 
        }/>
    )
}

export default PrivateRoute;