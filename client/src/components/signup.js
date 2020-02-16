import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import ''

class Signup extends Component {
    constructor(){
        super()
        this.state = {
            fname: '', lname: '', email: '', username: '', password: '', picture: '', 
            dispImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAOVBMVEWVu9////+QuN7z9/uLtdz6/P3m7vfH2u22z+jh6/Xt8/mavuCfweLU4vHQ4PCxzOemxeTA1evZ5vJjZrBAAAADaUlEQVRoge2bi26rMAyGE2MSSCgJvP/DjmtXVi42dYrOEb+0SauqfcOO49uq1K1bt24tBIDKV728QoBvgn2ojcvyXpkzdfBfwgMUpf6rsvgCHdDmb+ReucXEdAzr5IEeMCUaHpvkXo+UT/7u6D9uT0aGI3QHT/TkuG/wyexJfA4FAa11keTJSWitE5BJFk9kdSCitRY3Olgy20rDISOzM2l2JKO1rmTRDJNrXcs+OOFK+5Xw5ebp7u4c7kXZFQMt7XDOUdM6SqKBxw6SDifmkVmi+QQaFrv5b577QrYKLHaQRF8ZY5feLX67JXhXLnunKsdgO1n0lXnsoBlaSrg1YgW4dInuGWzho3ZprQgtmd2Ks+mZTDSLjSKzxckKqQ7PEvRj1ApdvCVS9HQi3JUMQkNCmySDB1r9IFs3zEJKLnNphj1AeXDR0vwVft2Mi1K1pTjkow5jPEVszzqIszTx9YTv3awJbtOltuFZYnKnLbObpNTpINWr6HrxHmEwxKkogPB+wbnpToEmii9OAGN3sdTTYcKwNLyZtxXY2aSMkosTQGXHI9bi85WiLl2e566sCzXDcCzqMqtk8IBV82tj93Qo9MLh+/zKS+PkmupjPPjCLNrAfGsRBlAs32gK/wkdZlsvnbtCBwjvsdfZ/jQd4vpFYoJa4LsfivWoz+JJ+E4PlrdNBYg4fMWm3e7Oz/Vmh6VC7owx7mgocKqYqDijhp2/8ERKR063v6eSn914U609sStXYjVOEbui4PT6R2LOAlj7kSMxqzhy10kRs5aSNDnT6Mx5+ZFYkwjGdIUi3gRG0t3MClbW3SyHkzpOjhgJRTS6ezEiXCyPzOLkE860nCLGRJ21JaCIsUngbWYoIm9vmNswishlm/gxZxx08WPOOOggfcw5YzfZ27wX+UYXqo5fRa6U5UOMHmTSmaQXsVBOEN7kABcumEYRy6YEVwv5coH1IdZnIv6PE2vvShVxP3sp+0KbXxnf0p1BL3p3AI1sJnOcpghUbKWSWdZG7pgNfRDAZ23wZ7YJgCrYwxnWtnJnwydD3YF/ZvRiPuP+8rEqakM1QG7qokLBGfowqg62Nbt7ItPaoF6m2oIafqmPwT5K41yW9R8w6b47Z8qHDdFP70gp6JzQMcaP1fQfrBln+Gmht27d+rf0A9LrJqGOTbjfAAAAAElFTkSuQmCC",
            status: false
        }
    }
    onChange = e =>{ let { name, value } = e.target; this.setState(()=>({ [name]: value })) }
    handleImage = e =>{
        // console.log(e.target)
        let file = e.target.files[0];
        this.setState(()=>({ picture: file }))
        if(file){
            console.log(file)

            // readAsDataUrl(file);
        }
    }
    onSubmit = e =>{
        e.preventDefault();
        const { fname, lname, email, username, password, picture } = this.state;

        if(fname !== '' && lname !== '' && email !== '' && username !== '' && password.length >= 6 ){ //&& picture !== ''
            let formdata = new FormData();
            formdata.append("fname", fname);
            formdata.append("lname", lname);
            formdata.append("email", email);
            formdata.append("username", username);
            formdata.append("password", password);
            // formdata.append("picture", picture);
    
            fetch('/signup', {
                method: 'POST',
                headers: new Headers(),
                body: formdata
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                this.setState(()=>({ status: data.status }))
            }).catch(err => console.log(err))
        }else{
            if(fname === ''){ alert("It seems you haven't entered your first name") }
            if(lname === ''){ alert("It seems you haven't entered your last name") }
            if(email === ''){ alert("It seems you haven't entered your email") }
            if(username === ''){ alert("It seems you haven't entered your username") }
            if(password === ''){ alert("It seems you haven't entered your password") }
            if(password.length < 6){ alert("Your password cannot be less than 6 characters") }
            // if(picture === ''){ alert("It seems you haven't uploaded your profile photo ") }
            alert(this.state)
        }

    }
    render() {
        if(this.state.status === true){ return <Redirect to="/login" /> }
        return (
            <React.Fragment>
                <div className="container">
                    <span style={{ visibility: 'hidden' }}>invisible</span>
                    <div className="card">
                        <h3 className="m-3">Signup</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="mt-5 p-3 row">
                                <div className="col-md-6">
                                    <div className="form-group text-center">
                                        <input type="file" className="d-none form-control custom-input" onChange={this.handleImage} name="picture" id="picture" /> {/* required */}
                                        <label htmlFor="picture">
                                            <img src={this.state.dispImg} className="mx-auto img-thumbnail rounded" alt="" />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control custom-input" onChange={this.onChange} placeholder="password" value={this.state.password} name="password" minLength="6" autoComplete="off" required/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input type="text" className="form-control custom-input" onChange={this.onChange} placeholder="first name" value={this.state.fname} name="fname" required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control custom-input" onChange={this.onChange} placeholder="last name" value={this.state.lname} name="lname" required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control custom-input" onChange={this.onChange} placeholder="email" value={this.state.email} name="email" required/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control custom-input" onChange={this.onChange} placeholder="username" value={this.state.username} name="username" autoComplete="off" required/>
                                    </div>
                                </div>

                                <p>
                                    <button className="btn btn-info m-3" type="submit">submit</button>
                                    Already have an account? <Link to="/login"> login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Signup;
