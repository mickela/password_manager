import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Landing from './components/landing';
import Profile from './components/Profile';

function Routes (){
    return(
        <>
            <Route exact path='/' component={Landing} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
        </>
    )
}
export default Routes;