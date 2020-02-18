import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

function Navbar(props) {

    const [state, setstate] = useState(false);

    const redire = () => setstate(true);

    const logout = ()=>{
        sessionStorage.clear();
        redire();
    }
    if(state === true){
        return( <Redirect to="/login" /> );
    }else{
        let activeHome, activeProfile;
        if(props.page === 'home'){
            activeHome = "nav-item active";
            activeProfile = 'nav-item ';
        }else if(props.page === 'profile'){
            activeHome = 'nav-item ';
            activeProfile = "nav-item active";
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Manager</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className={activeHome}>
                                <Link className="nav-link" to="/">Home </Link>
                            </li>
                            <li className={activeProfile}>
                                <Link className="nav-link" to="/profile">Profile </Link>
                            </li>
                        </ul>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={logout}>Logout</button>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navbar
