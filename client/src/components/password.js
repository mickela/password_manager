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
            <i className="fas fa-eye" style={{ cursor: 'pointer' }} onClick={()=>{ setType( isText ? false : true ) }} />
        </div>
    )
}

export default Password
