import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';


class Credform extends Component {
    constructor(){
        super();
        this.state = {
            app: '', password: '', email: '', username: '', isSent: false, isLoaded: false, response: '', bg: 'danger'
        }
    }

    onChange = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }))
    }

    submit = e =>{
        e.preventDefault();
        
        const { app, username, password, email } = this.state;
        
        if( app !== '' && username !== '' && password !== '' && email !== '' ){
           
            this.setState(()=>({ isSent: true, response: 'Loading...', bg: 'info' }))
            const user_id = sessionStorage.getItem('profile').split(',')[0];
    
            const formdata = new FormData();
            formdata.append("user_id", user_id);
            formdata.append("app", app);
            formdata.append("login", username);
            formdata.append("key", password);
            formdata.append("alt_login", email);
    
            fetch('/credentials',{
                method: 'POST',
                headers: new Headers(),
                body: formdata
            }).then(res => res.json())
            .then(data =>{
                console.log(data)
                if(data.status === false){
                    this.setState(()=>({
                        isSent: false,
                        response: data.msg,
                        bg: 'danger'
                    }))
                }else{
                    this.setState(()=>({
                        isSent: false,
                        response: data.msg,
                        bg: 'success'
                    }))
                    this.props.reload(true);
                }
            })
            .catch(err => console.log(err))
            
        }else{
            this.setState(()=>({ response: 'It seems you have one or more fields empty', bg: 'danger' }))
        }
    }

    render() {
        const { app, password, email, username, isSent, response, bg } = this.state;

        let display = '';
        
        let message = response.length !== 0 ? <div className={`alert alert-${bg}`} role="alert">
            {response}
        </div> : '';


        if(isSent === true){
            display = <div className="text-center m-5">
                <Spinner animation="border" size="lg" variant="primary" />
            </div>
        }else{
            display = <form onSubmit={this.submit}>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="example: facebook, twitter, etc" name="app" value={app} onChange={this.onChange} />
                </div>                
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="username" name="username" value={username} onChange={this.onChange} />
                </div>                
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="password" name="password" value={password} onChange={this.onChange} />
                </div>                
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="email" name="email" value={email} onChange={this.onChange} />
                </div>                
                    
                <div className="form-group">
                    <input type="submit" className="btn btn-info btn-block btn-sm" value="submit" />
                </div>
            </form>
        }



        return (
            <div>
                {message}
                {display}
            </div>
        )
    }
}

export default Credform
