import React, { useState } from 'react'

function Password(props) {

    const [isText, setType] = useState(false);
    
    let type = isText === true ? 'text' : 'password' ;

    const style = {
        border: 'none',
        cursor: 'text',
        backgroundColor: 'transparent',
        color: '#000'
    }

    return (
        <div>
            <input type={type} value={props.children} style={style} disabled />
            &nbsp;
            <button className="btn btn-light" onClick={()=>{ setType( isText ? false : true ) }} >
                <i className="fas fa-eye" style={{ cursor: 'pointer' }}/>
            </button>
        </div>
    )
}

export default Password
