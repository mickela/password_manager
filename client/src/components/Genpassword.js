import React, { Component } from 'react';

class Genpassword extends Component {
    render() {
        return (
            <div className="container">
                <h2>Password Generator</h2>
                <div className="result-container">
                    <span id="result"></span>
                    <button className="btn" id="clipboard">
                        <img src="clipboard.svg" alt="copy"/>
                        {/* <i className="far fa-clipboard"></i> */}
                    </button>
                </div>
                <div className="settings">
                    <div className="setting">
                        <label for="length">Password Length</label>
                        <input type="number" min="1" max="20" id="length" value="20"/>
                    </div>
                    <div className="setting">
                        <label for="uppercase">Include uppercase letters</label>
                        <input type="checkbox" checked id="uppercase"/>
                    </div>
                    <div className="setting">
                        <label for="lowercase">Include lowercase letters</label>
                        <input type="checkbox" checked id="lowercase"/>
                    </div>
                    <div className="setting">
                        <label for="numbers">Include numbers</label>
                        <input type="checkbox" checked id="numbers"/>
                    </div>
                    <div className="setting">
                        <label for="symbols">Include symbols</label>
                        <input type="checkbox" checked id="symbols"/>
                    </div>
                </div>
                <button className="btn btn-large" id="generate">
                    Generate Password
                </button>
            </div>
        )
    }
}

export default Genpassword;