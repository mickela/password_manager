import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import CustomAlert from '../alert';

class Changepassword extends Component {
    constructor(){
        super()
        this.state = {
            id: '', password: '', new_password: '', isSent: false, bg: 'info', response: ''
        }
    }

    handleInput = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: value }));
    }

    componentDidMount(){
        const id = sessionStorage.getItem('profile').split(',')[0];
        this.setState(()=>({ id: id }));
    }

    submit = e =>{
        e.preventDefault();

        
        const { id, password, new_password } = this.state;
        
        if( password.length > 5 && new_password.length > 5 ){

            this.setState(()=>({
                isSent: true,
                response: "Updating password",
                bg: 'warning'
            }))
    
            const formdata = new FormData();
            formdata.append("id", id);
            formdata.append("password", password);
            formdata.append("new_password", new_password);
    
            fetch('/newpassword', {
                method: 'PUT',
                headers: new Headers(),
                body: formdata
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
                        bg: 'success'
                    }))
    
                }
            })
            .catch(err => console.log(err))

        }else if ( password.length > 0 && password.length < 6 ){

            this.setState(()=>({
                isSent: false,
                response: "Password must be at least 6 characters long",
                bg: 'danger'
            }))

        }else if ( new_password.length > 0 && new_password.length < 6 ){

            this.setState(()=>({
                isSent: false,
                response: "New Password must be at least 6 characters long",
                bg: 'danger'
            }))

        }else{

            this.setState(()=>({
                isSent: false,
                response: "It seems you have one or more fields empty",
                bg: 'danger'
            }))

        }
    }

    render() {

        const { password, new_password, isSent, bg, response } = this.state;

        if(isSent){

            return(
                <div className="text-center mt-5">
                    <CustomAlert bg={bg} body={response} />
                    <Spinner animation="grow" variant="warning" size="lg" />
                </div>
            )

        }else{
            let message = response.length < 1 ? '' : <CustomAlert bg={bg} body={response} />;
            return (

                <div className="text-center mt-5">
                    {message}
                    <form onSubmit={this.submit}>
                        <div className="form-group">
                            <input type="password" className="form-control" onChange={this.handleInput} name="password" value={password} placeholder="current password" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" onChange={this.handleInput} name="new_password" value={new_password} placeholder="new password" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-sm btn-outline-info">submit</button>
                        </div>
                    </form>
                </div>
                
            )

        }
    }
}

export default Changepassword;
