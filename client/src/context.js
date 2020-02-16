import React, { Component } from 'react';

const Context = React.createContext();


export class Provider extends Component {
    constructor(){
        super();
        this.state = {
            profile: {}, 
            isLoggedIn: false, 
            change: () => this.setState(() =>({ isLoggedIn: true }) )
        }
    }

    componentDidMount(){
        // var po = sessionStorage.getItem('profile');
        // if(po){
        //     console.log(po)
        // }
    }

    render() {
        if(this.state.isLoggedIn === true){
            console.log('context state has been mutated')
        }
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;


// change: (profile, isLoggedIn) => this.setState(() =>({
//     profile: profile,
//     isLoggedIn: isLoggedIn
// }))