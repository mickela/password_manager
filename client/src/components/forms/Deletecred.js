import React, { Component } from 'react'

class Deletecred extends Component {
    constructor(){
        super()
        this.state = {
            isDeleted: false,
            isPosted: false
        }
    }

    delete = () =>{

        const { id, userId } = this.props;

        const formdata = new FormData();
        formdata.append("id", id);
        formdata.append("user_id", userId);

        fetch('/credentials', {
            method: 'DELETE',
            headers: new Headers(),
            body: formdata
        }).then(res => res.json())
        .then(data =>{
            console.log(data)
        }).catch(err => console.log(err))
    }

    render() {
        const { app } = this.props;
        return (
            <div>
                Are you sure you want to delete your <b>{app}</b> credentials?
                <hr />
                <div className="text-right">
                    <button className="btn btn-danger btn-sm" onClick={this.delete}>Delete</button>
                </div>
            </div>
        )
    }
}

export default Deletecred;
