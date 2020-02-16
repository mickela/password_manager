import React, { Component } from 'react'

export class Credform extends Component {
    constructor(){
        super();
        this.state = {
            app: '', password: '', email: '', username: ''
        }
    }

    onChange = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }))
    }

    submit = e =>{
        e.preventDefault();

        const { app, username, password, email } = this.state;
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
        })
        .catch(err => console.log(err))
    }

    render() {
        const { app, password, email, username } = this.state;
        return (
            <div>
                <form onSubmit={this.submit}>
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
            </div>
        )
    }
}

export default Credform
