import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import { Spinner } from 'react-bootstrap';
import Modal from './Mymodal';
import Password from './password';
import Credform from './forms/Credform';
import Navbar from './Navbar';
import Editcred from './forms/Editcred';
import Deletecred from './forms/Deletecred';
import { Cols } from './columns';

class Landing extends Component {
    constructor(){
        super();
        this.state = {
            isLoaded: false,
            value: '',
            credentials: [],
            redirect: false
        }
    }

    FetchData(){
        // reset state
        this.setState(()=>({
            value: '', 
            isLoaded: false,
            credentials: []
        }));

        const profile = sessionStorage.getItem('profile').split(',');
        console.log(profile)
        fetch(`/credentials/${profile[0]}`)
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.status === true){
                let i = 1;
                
                data.cred.forEach(crede =>{
                    crede.sn = i++;
                    let ky = crede.key;
                    crede.key = <Password>{ky}</Password>;
                    crede.action = <>
                        <Modal Class="btn-sm btn-info mr-1" buttonIcon="fas fa-pen" title="Edit Credential">
                            <Editcred userId={crede.user_id} id={crede.id} username={crede.login} email={crede.altLogin} app={crede.app} password={ky} reload={this.reload} />
                        </Modal>
                        <Modal Class="btn-sm btn-danger ml-1" buttonIcon="fas fa-trash-alt" title="Delete Credential">
                            <Deletecred userId={crede.user_id} id={crede.id} app={crede.app} reload={this.reload}/>
                        </Modal>
                    </>;
                })

                this.setState(()=>({
                    value: data.msg, 
                    isLoaded: true,
                    credentials: data.cred
                }));

            }else{
                this.setState(()=>({ value: 'You have no credentials to view', isLoaded: true }));
            }
        })
        .catch(err => console.log(err));
    }

    componentDidMount(){
        var isLoggedIn = sessionStorage.getItem('isLoggedIn');
        // console.log('isloggedin', typeof isLoggedIn)
        if(isLoggedIn === 'true' || isLoggedIn === true){
            this.FetchData();
        }else if(isLoggedIn === null || isLoggedIn === 'false' || isLoggedIn === false){
         this.setState(()=>({ redirect: true }))   
        }
    }

    reload = () =>{
        this.FetchData();
    }

    render() {
        const { isLoaded, redirect } = this.state;
        if(isLoaded === false && redirect !== true){
            return (
                <div>
                    <Navbar page="home" />
                    <div className="pt-5 mb-5 text-center">
                        <Spinner animation="border" variant="primary" size="lg" />
                    </div>
                </div>
            )            
        }else if(isLoaded === false && redirect === true){
            return <Redirect to="/login" />;
            // this.setState(()=>({ redirect: false }))   
        }else{
            const { credentials } = this.state;

            for (let i = credentials.length-1; i >= 0; i--) {
                credentials.push(credentials[i]);
                credentials.splice(i, 1);
            }

            let data = {
                columns: Cols,
                rows: credentials
            };

            let btnstyle =  {borderRadius: '16rem'};

            return (
                <>
                    <Navbar page="home" />
                    <div className="container">
                        <h3 className="pt-3">
                            <Modal Class="btn-info btn-lg shadow" buttonStyle={btnstyle} buttonIcon="fas fa-pencil-alt" title="New Credential">
                                <Credform reload={this.reload} />
                            </Modal>
                            &nbsp;
                        <span className="ml-5">{this.state.value}</span>
                        </h3>
                        <hr />
                        <MDBDataTable striped bordered hover data={data} />
                    </div>
                </>
            )
        }
    }
}

export default Landing;
