import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

class Navbar extends Component{
    constructor(){
        super();
        this.state = {
            redirect: false,
            show: false,
            dropdown: false,
            img: '', username: ''
        }
    }

    toggleNav = ()=> this.setState(()=>({ show: !this.state.show }));
    dropdown = () => this.setState(()=>({ dropdown: !this.state.dropdown }));
    logout = ()=>{
        sessionStorage.clear();
        this.setState(()=>({ redirect: true }));
    }

    loadComponent = () =>{
        let id = sessionStorage.getItem('profile').split(',')[0];
        // console.log(id)
        // console.log('type', typeof id)
        if(id){
            fetch(`/profile/${id}`)
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                const { username, image } = data.details;
                this.setState(()=>({ username, img: image }))
            })
            .catch(err =>{
                console.log(err)
                this.loadComponent();
            })
        }
    }
    componentDidMount(){
        this.loadComponent();
    }

    render(){
        const { redirect, show, dropdown, img, username } = this.state;
        if(redirect === true){
            return( <Redirect to="/login" /> );
        }else{
    
            let activeHome = `nav-item ${ this.props.page === 'home' ? 'active' : '' }`,
            activeProfile = `nav-item ${ this.props.page === 'profile' ? 'active' : '' }`,
            activeNav = `collapse navbar-collapse ${ show ? 'show' : '' }`,
            isExpanded = dropdown ? 'true' : 'false',
            dropClass = dropdown ? 'dropdown-menu show' : 'dropdown-menu';
    
            return (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-info shadow">
                        <Link className="navbar-brand" to="/">Manager</Link>
                        <button className="navbar-toggler" onClick={this.toggleNav} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
        
                        <div className={activeNav} id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className={activeHome}>
                                    <Link className="nav-link" to="/">Home </Link>
                                </li>
                                <li className={activeProfile}>
                                    <Link className="nav-link" to="/profile">Profile </Link>
                                </li>
                            </ul>

                            <div className="dropdown">
                                <button className="theImgContainer btn btn-info dropdown-toggle" onClick={this.dropdown} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded={isExpanded}>
                                    <img src={img} className="nav-profile-img" alt="" />
                                </button>
                                <div className={dropClass} aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to="/profile">Profile</Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item text-danger" href="#as" onClick={this.logout}>Logout</a>
                                </div>
                            </div>
                            {' '} <small className="text-light">Howdy, {username}</small>
                        </div>
                    </nav>
                </div>
            )
        }
    }
}

export default Navbar
