import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from './Mymodal';
import Credform from './forms/Credform';

export class Landing extends Component {
    constructor(){
        super();
        this.state = {
            isLoaded: false,
            value: '',
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
                this.setState(()=>({ value: 'You have credentials to view', isLoaded: true }));
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
            return (
                <div className="container">
                    <h3>
                        <Modal Class="btn-info btn-lg rounded-circle shadow" buttonName="+" title="New Credential">
                            <Credform />
                        </Modal>
                        &nbsp;
                        {this.state.value}
                    </h3>
                    <hr />
                </div>
            )
        }
    }
}

export default Landing;
