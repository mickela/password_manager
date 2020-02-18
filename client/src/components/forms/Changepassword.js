import React, { Component } from 'react';

class Changepassword extends Component {
    constructor(){
        super()
        this.state = {
            id: '', password: '', new_password: ''
        }
    }

    handleInput = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }));
    }

    submit = e =>{
        e.preventDefault();

        const { id, password, new_password } = this.state;

        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("password", password);
        formdata.append("new_password", new_password);

        fetch('/newpassword', {
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
        return (
            <div className="text-center">
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <input type="password" className="form-control" onChange={this.handleInput} name="password" placeholder="current password" />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" onChange={this.handleInput} name="new_password" placeholder="new password" />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-sm btn-outline-info">submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Changepassword;
