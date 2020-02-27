import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';
import CustomAlert from '../alert';


class Editprofile extends Component {
    constructor(){
        super()
        this.state = {
            id: '', fname: '', lname: '', email: '', username: '',
            isSent: false, bg: 'info', response: '', picture: '', dispImg: ''
        }
    }

    handleInput = e =>{
        const { name, value } = e.target;
        this.setState(()=>({ [name]: [value] }));
    }

    handleFile = e =>{
        const reader = new FileReader();

        let file = e.target.files[0];
        if(file){
            console.log(file)
            const { type } = file;

            if(type === "image/png" || type === "image/jpeg"){
                console.log(file.type)

                this.setState(()=>({ picture: file }))
                reader.onload = () =>{

                    this.setState(()=>({
                        dispImg: reader.result
                    }))

                }
            }else{
                this.setState(()=>({ response: 'Please upload an image', bg: 'warning' }))
            }

            reader.readAsDataURL(file);
        }else{
            // fallback
            this.setState(()=>({
                dispImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAOVBMVEWVu9////+QuN7z9/uLtdz6/P3m7vfH2u22z+jh6/Xt8/mavuCfweLU4vHQ4PCxzOemxeTA1evZ5vJjZrBAAAADaUlEQVRoge2bi26rMAyGE2MSSCgJvP/DjmtXVi42dYrOEb+0SauqfcOO49uq1K1bt24tBIDKV728QoBvgn2ojcvyXpkzdfBfwgMUpf6rsvgCHdDmb+ReucXEdAzr5IEeMCUaHpvkXo+UT/7u6D9uT0aGI3QHT/TkuG/wyexJfA4FAa11keTJSWitE5BJFk9kdSCitRY3Olgy20rDISOzM2l2JKO1rmTRDJNrXcs+OOFK+5Xw5ebp7u4c7kXZFQMt7XDOUdM6SqKBxw6SDifmkVmi+QQaFrv5b577QrYKLHaQRF8ZY5feLX67JXhXLnunKsdgO1n0lXnsoBlaSrg1YgW4dInuGWzho3ZprQgtmd2Ks+mZTDSLjSKzxckKqQ7PEvRj1ApdvCVS9HQi3JUMQkNCmySDB1r9IFs3zEJKLnNphj1AeXDR0vwVft2Mi1K1pTjkow5jPEVszzqIszTx9YTv3awJbtOltuFZYnKnLbObpNTpINWr6HrxHmEwxKkogPB+wbnpToEmii9OAGN3sdTTYcKwNLyZtxXY2aSMkosTQGXHI9bi85WiLl2e566sCzXDcCzqMqtk8IBV82tj93Qo9MLh+/zKS+PkmupjPPjCLNrAfGsRBlAs32gK/wkdZlsvnbtCBwjvsdfZ/jQd4vpFYoJa4LsfivWoz+JJ+E4PlrdNBYg4fMWm3e7Oz/Vmh6VC7owx7mgocKqYqDijhp2/8ERKR063v6eSn914U609sStXYjVOEbui4PT6R2LOAlj7kSMxqzhy10kRs5aSNDnT6Mx5+ZFYkwjGdIUi3gRG0t3MClbW3SyHkzpOjhgJRTS6ezEiXCyPzOLkE860nCLGRJ21JaCIsUngbWYoIm9vmNswishlm/gxZxx08WPOOOggfcw5YzfZ27wX+UYXqo5fRa6U5UOMHmTSmaQXsVBOEN7kABcumEYRy6YEVwv5coH1IdZnIv6PE2vvShVxP3sp+0KbXxnf0p1BL3p3AI1sJnOcpghUbKWSWdZG7pgNfRDAZ23wZ7YJgCrYwxnWtnJnwydD3YF/ZvRiPuP+8rEqakM1QG7qokLBGfowqg62Nbt7ItPaoF6m2oIafqmPwT5K41yW9R8w6b47Z8qHDdFP70gp6JzQMcaP1fQfrBln+Gmht27d+rf0A9LrJqGOTbjfAAAAAElFTkSuQmCC",
            }))

        }
    }

    submit = e =>{
        e.preventDefault();

        const { id, fname, lname, email, username, picture } = this.state;

        if( fname !== '' && lname !== '' && email !== '' && username !== '' && picture !== '' ){
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
            formdata.append("picture", picture);
    

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
        id = session[0], fname = session[1], lname = session[2], email = session[3], username = session[4], dispImg = session[5];
        console.log(id)
        this.setState(()=>({ id, fname, lname, username, email, dispImg }))
    }

    componentDidMount(){
        this.fetchDetails();
    }

    render() {
        const { fname, lname, username, email, dispImg, isSent, response, bg } = this.state;

        if(isSent === false){

            let message = response.length !== 0 ? <CustomAlert bg={bg} body={response} /> : '';
         
            return (
                <div className="text-center mt-5">
                    <form onSubmit={this.submit}>
                        {message}
                        <div className="row">
                            <div className="col-md-6">
                                <input type="file" className="d-none" name="picture" onChange={this.handleFile} id="fileInp" />
                                <label htmlFor="fileInp" className="cursor-pointer profile-photo">
                                    <img 
                                        src={dispImg}
                                        className="mx-auto img-thumbnail rounded cursor-pointer" 
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
