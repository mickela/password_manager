import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
// import { Post } from './Request';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '', password: '', isLoggedIn: false, profile: {},
            isReadonly: false, isSent: false, isLoaded: false, response: ''
        }
    }
    onChange = e =>{ let { name, value } = e.target; this.setState(()=>({ [name]: value })) }
    
    

    onSubmit = e =>{
        e.preventDefault();

        
        const { username, password } = this.state;
        if( username !== '' && password !== '' ){
            
            this.setState(()=>({ 
                response: '',
                isSent: true
            }))

            let formdata = new FormData();
            formdata.append("username", username);
            formdata.append("password", password);
    
            fetch('/login', {
                method: 'POST',
                headers: new Headers(),
                body: formdata
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                this.setState(()=>({ 
                    isLoggedIn: data.status, profile: data.userData, isSent: false,
                    response: data.msg
                }))
            })
            .catch(err => console.log(err))

        }else{
            this.setState(()=>({ response: 'It seems you have one or more fields empty' }))
        }

    }
    render() {
        const { isLoggedIn, profile, isSent, isLoaded, response } = this.state;
        
        if(isLoggedIn === true){
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('profile', [profile.id, profile.fname, profile.lname, profile.email, profile.username, profile.picture]);
            return(
                <Redirect to="/" />
            )
        }

        if(isSent === true){
            return(
                <div className="container">
                    <span style={{ visibility: 'hidden' }}>invisible</span>
                    <div className="card">
                        <h3 className="m-3">Validating...</h3>
                        <div className="text-center pt-5 pb-5">
                            <Spinner animation="border" variant="primary" size="lg" />
                        </div>
                    </div>
                </div>
            )
        }else{

            let message = response.length !== 0 ? <div className="alert alert-danger" role="alert">
                {response}
            </div> : '';

            return (
                <React.Fragment>
                    <div className="container">
                        <span style={{ visibility: 'hidden' }}>invisible</span>
                        <div className="card">
                            <h3 className="m-3">Login</h3>


                            <form onSubmit={this.onSubmit}>
                                <div className="mt-5 p-3 row">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-4">

                                        {message}

                                        <div className="form-group">
                                            <input type="text" className="form-control custom-input" onChange={this.onChange} placeholder="username or email" value={this.state.username} name="username" autoComplete="off" />
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control custom-input" onChange={this.onChange} placeholder="password" value={this.state.password} name="password" autoComplete="off" />
                                        </div>
                                        <p>
                                            <button className="btn btn-info btn-sm btn-block" type="submit">log in</button>
                                            <br />
                                            Don't have an account? <Link to="/signup"> signup</Link>
                                        </p>
                                    </div>
                                    <div className="col-md-4"></div>
    
                                </div>
                            </form>
                        </div>
                    </div>
                </React.Fragment>
            )

        }


            
    }
}

export default Login;
