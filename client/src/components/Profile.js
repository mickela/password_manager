import React, { Component } from 'react'
import Navbar from './Navbar';
import Changepassword from './forms/Changepassword';
import Editprofile from './forms/Editprofile';

class Profile extends Component {
    render() {
        return (
            <div>
                <Navbar page="profile" />
                <div className="container">
                    <div className="row mt-5 p-5 bg-light shadow-lg rounded">
                        <div className="col-md-8 pt-3">
                            <h3>View Profile</h3>
                            <Editprofile />
                        </div>
                        <div className="col-md-4 pt-3">
                            <h3>Change password</h3>
                            <br />
                            <Changepassword />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;
