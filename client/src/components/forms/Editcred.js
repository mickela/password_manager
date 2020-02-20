import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

class Editcred extends Component {
    constructor(){
        super();
        this.state = {
            app: '', password: '', email: '', username: '', 
            userId: '', id: '', isSent: false, response: '', bg: 'info'
        }
    }

    onChange = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }))
    }

    submit = e =>{
        e.preventDefault();
        
        const { app, username, password, email, id, userId } = this.state;
        
        if( app !== '' && username !== '' && password !== '' && email !== '' ){

            this.setState(()=>({ isSent: true, response: '' }))

            const form = new FormData();
            form.append("user_id", userId);
            form.append("id", id);
            form.append("app", app);
            form.append("login", username);
            form.append("key", password);
            form.append("alt_login", email);
    
            fetch('/credentials',{

                method: 'PUT',
                headers: new Headers(),
                body: form

            })
            .then(res => res.json())
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
                        bg: 'info'
                    }))

                    this.props.reload(true)

                }
            })
            .catch(err => console.log(err))

        }else{
            this.setState(()=>({ isSent: false, response: 'Oops, It seems you have one or more fields empty', bg: 'danger' }))
        }
        
    }

    componentDidMount(){
        const { userId, id, username, email, app, password } = this.props;

        this.setState(()=>({ 
            app, password, email, username, userId, id
         }))
    }

    render() {
        const { app, password, email, username, response, isSent, bg } = this.state;
        if( isSent === false){

            let message = response.length !== 0 ? <div className={`alert alert-${bg}`} role="alert">
                {response}
            </div> : '';

            return (
                <div>
                    <form onSubmit={this.submit}>
                        {message}
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

        }else{
            return(
                <div className="text-center">
                    <Spinner animation="border" size="lg" variant="primary" />
                </div>
            )
        }
    }
}

export default Editcred;
