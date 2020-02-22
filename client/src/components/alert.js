import React, { useState } from 'react';
import { Alert  } from 'react-bootstrap';


function CustomAlert(props) {
    const [show, setShow] = useState(true);
  
    const { body, bg, heading } = props;

    if (show) {
      return (
        <Alert variant={bg} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{heading}</Alert.Heading>
        {body}
        </Alert>
      );
    }
    return("");
  }

export default CustomAlert;