import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import CustomAlert from '../alert';


class Editprofile extends Component {
    constructor(){
        super()
        this.state = {
            id: '', fname: '', lname: '', email: '', username: '',
            isSent: false, bg: 'info', response: '', picture: ''
        }
    }

    handleInput = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }));
    }

    submit = e =>{
        e.preventDefault();

        const { id, fname, lname, email, username } = this.state; //, picture

        if( fname !== '' && lname !== '' && email !== '' && username !== '' ){ // && picture !== ''

            this.setState(()=>({
                isSent: true,
                response: 'Updating..',
                bg: 'info'
            }))

            const formdata = new FormData();
            formdata.append("id", id);
            formdata.append("fname", fname);
            formdata.append("lname", lname);
            formdata.append("email", email);
            formdata.append("username", username);
            // formdata.append("picture", picture);
    
            fetch('/editprofile', {
                method: 'PUT',
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

                    this.props.reload(true)

                }
            })
            .catch(err => console.log(err))

        }else{
            this.setState(()=>({
                isSent: false,
                response: 'It seems you have one or more fields empty',
                bg: 'danger'
            }))
        }

    }

    fetchDetails = ()=>{
        const session = sessionStorage.getItem('profile').split(','),
        id = session[0], fname = session[1], lname = session[2], email = session[3], username = session[4], picture = session[5];
        console.log(id)
        this.setState(()=>({ id, fname, lname, username, email, picture }))
    }

    componentDidMount(){
        this.fetchDetails();
    }

    render() {
        const { fname, lname, username, email, picture, isSent, response, bg } = this.state;

        if(isSent === false){

            let message = response.length !== 0 ? <CustomAlert bg={bg} body={response} /> : '';
         
            return (
                <div className="text-center mt-5">
                    <form onSubmit={this.submit}>
                        {message}
                        <div className="row">
                            <div className="col-md-6">
                                <input type="file" className="d-none" id="fileInp" />
                                <label htmlFor="fileInp" className="cursor-pointer profile-img">
                                    <img 
                                        src={picture}
                                        className="img-thumbnail m-3 cursor-pointer" 
                                        alt="profile-img" 
                                    />
                                </label>
                            </div>
                            
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={this.handleInput} value={fname} name="fname" placeholder="first name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={this.handleInput} value={lname} name="lname" placeholder="last name" />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" onChange={this.handleInput} value={username} name="username" placeholder="username" />
                                </div>
                            </div>
    
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control" onChange={this.handleInput} value={email} name="email" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-sm btn-info">submit</button>
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

export default Editprofile;
