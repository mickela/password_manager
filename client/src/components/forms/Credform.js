import React, { Component } from 'react'

export class Credform extends Component {
    constructor(){
        super();
        this.state = {
            app: '', password: '', email: '', username: ''
        }
    }

    onChange = e =>{}

    render() {
        const { app, password, email, username } = this.state;
        return (
            <div>
                <form>
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
