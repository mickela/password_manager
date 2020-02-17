import React, { Component } from 'react';

class Editcred extends Component {
    constructor(){
        super();
        this.state = {
            app: '', password: '', email: '', username: '', userId: '', id: ''
        }
    }

    onChange = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }))
    }

    submit = e =>{
        e.preventDefault();

        const { app, username, password, email, id, userId } = this.state;

        const formdata = new FormData();
        formdata.append("user_id", userId);
        formdata.append("id", id);
        formdata.append("app", app);
        formdata.append("login", username);
        formdata.append("key", password);
        formdata.append("alt_login", email);

        fetch('/credentials',{
            method: 'PUT',
            headers: new Headers(),
            body: formdata
        }).then(res => res.json())
        .then(data =>{
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    componentDidMount(){
        const { userId, id, username, email, app, password } = this.props;

        this.setState(()=>({ 
            app, password, email, username, userId, id
         }))
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

export default Editcred;
