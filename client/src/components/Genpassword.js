import React, { Component } from 'react';
import Navbar from "./Navbar";
// import clipboard from "../clipboard.svg";

class Genpassword extends Component {
    constructor(){
        super();
        this.state = {
            hasUpper: true, hasLower: true, hasNumber: true, hasSymbol: true, length: 20,
            result: ''
        }
    }

    generatePassword = (upper, lower, number, symbol, length) =>{
        let generatedPassword = "";
        const typesCount = lower + upper + number + symbol;
        // console.log("typesCount: ", typesCount);
        const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
        // console.log("typesArr: ", typesArr);
        if(typesCount === 0){
            return "";
        }

            // Generator functions - https://www.net-comber.com/charset.html
        const getRandomLower = () =>{
            return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
        }
        
        const getRandomUpper = () =>{
            return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }
        
        const getRandomNumber = () =>{
            return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
        }
        
        const getRandomSymbol = () =>{
            const symbols = '!@#$%^&*()<>/';
            return symbols[Math.ceil(Math.random() * ( symbols.length - 1) )];
        }


        const randomFunc = {
            lower: getRandomLower,
            upper: getRandomUpper,
            number: getRandomNumber,
            symbol: getRandomSymbol
        };

        for(let i = 0; i < length; i += typesCount){
            typesArr.forEach(type => {
                const funcName = Object.keys(type)[0];
                // console.log({ funcName });
                    
                generatedPassword += randomFunc[funcName]();
            })
        }

        const finalPassword = generatedPassword.slice(0, length);
        
        return finalPassword;
    }
    
    genpass = () =>{
        const { hasUpper, hasLower, hasNumber, hasSymbol, length } = this.state;
        let res = this.generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);

        this.setState(()=>({
            result: res
        }))
    }

        // copy password to clipboard
    handleCopy = e =>{

        const textarea = document.createElement("TEXTAREA");
        const password = this.state.result;
    
        if(!password || password === ''){
            alert("Nothing to copy!");
        } else{
            textarea.value = password;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            textarea.remove();
            alert('Password copied to clipboard');
        }
    
    }

    inputChange = e =>{
        const { name, value } = e.target;
        this.setState(()=>({
            [name]: [value]
        }))
    }

    handleCheckbox = e =>{
        const { name } = e.target;
        let prevState = this.state[name];
        this.setState(()=>({
            [name]: !prevState
        }))
    }

    render() {
        const { result, length } = this.state;
        return (
            <>
            <Navbar page="genpassword" />
            <div className="passgen-body bg-light">

                <div className="passgen-container shadow bg-info">
                    <h2 className="pass-title">Password Generator</h2>
                    <div className="result-container">
                        <span id="result">{result}</span>
                        <button className="passgen-btn btn-primary" onClick={this.handleCopy} id="clipboard" title="copy password">
                            {/* <img src={clipboard} alt="copy"/> */}
                            <i className="far fa-clipboard"></i>
                        </button>
                    </div>

                    <div className="settings">

                        <div className="setting">
                            <label htmlFor="length">Password Length</label>
                            <input type="number" min="1" max="20" id="length" name="length" value={length} onChange={this.inputChange} />
                        </div>
                        <div className="setting">
                            <label htmlFor="uppercase">Include uppercase letters</label>
                            <input type="checkbox" className="settings-checkbox" onChange={this.handleCheckbox} name="hasUpper" defaultChecked id="uppercase"/>
                        </div>

                        <div className="setting">
                            <label htmlFor="lowercase">Include lowercase letters</label>
                            <input type="checkbox" className="settings-checkbox" onChange={this.handleCheckbox} name="hasLower" defaultChecked id="lowercase"/>
                        </div>

                        <div className="setting">
                            <label htmlFor="numbers">Include numbers</label>
                            <input type="checkbox" className="settings-checkbox" onChange={this.handleCheckbox} name="hasNumber" defaultChecked id="numbers"/>
                        </div>
                        <div className="setting">
                            <label htmlFor="symbols">Include symbols</label>
                            <input type="checkbox" className="settings-checkbox" onChange={this.handleCheckbox} name="hasSymbol" defaultChecked id="symbols"/>
                        </div>

                    </div>
                    <button className="passgen-btn btn-large  btn-primary" id="generate" onClick={this.genpass}>
                        Generate Password
                    </button>
                </div>
            </div>
            </>
        )
    }
}

export default Genpassword;