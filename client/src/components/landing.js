import React, { Component } from 'react';
// import { Consumer } from '../context';
import Modal from './Mymodal';
import Credform from './forms/Credform';

export class Landing extends Component {
    constructor(){
        super();
        this.state = {
            isLoaded: false,
            value: ''
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
        this.FetchData();
    }

    render() {
        const { isLoaded } = this.state;
        if(isLoaded === false){
            return (
                <div>
                    loading...
                </div>
            )            
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
