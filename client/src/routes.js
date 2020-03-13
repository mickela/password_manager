import React from 'react';
import { Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Landing from './components/landing';
import Profile from './components/Profile';
import Genpassword from './components/Genpassword';

function Routes (){
    return(
        <>
            <Route exact path='/' component={Landing} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/genpassword' component={Genpassword} />
        </>
    )
}
export default Routes;