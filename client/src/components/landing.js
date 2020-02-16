import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';
import Modal from './Mymodal';
import Password from './password';
import Credform from './forms/Credform';
import { Cols } from './columns';

export class Landing extends Component {
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
                        <button className="btn btn-sm btn-info">edit</button>
                        <button className="btn btn-sm btn-danger">delete</button>
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

    render() {
        const { isLoaded, redirect } = this.state;
        if(isLoaded === false && redirect !== true){
            return (
                <div>
                    loading...
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
                <div className="container">
                    <h3 className="pt-3">
                        <Modal Class="btn-info btn-lg shadow" buttonStyle={btnstyle} buttonIcon="fas fa-edit" title="New Credential">
                            <Credform />
                        </Modal>
                        &nbsp;
                    <span className="ml-5">{this.state.value}</span>
                    </h3>
                    <hr />
                    <MDBDataTable striped bordered hover data={data} />
                </div>
            )
        }
    }
}

export default Landing;
