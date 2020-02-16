import React, { useState } from 'react';
import { Modal } from 'react-bootstrap'


function Mymodal(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const btnclass = `btn ${props.Class}`;

    return (
      <>
        <button className={btnclass} onClick={handleShow} style={props.buttonStyle}>
          <i className={props.buttonIcon} />
          {props.buttonName}
        </button>
  
        <Modal show={show} onHide={handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
              {props.children}
            </Modal.Body>
            {/* <Button variant="secondary" onClick={handleClose}> */}
          
        </Modal>
      </>
    );
}

export default Mymodal;