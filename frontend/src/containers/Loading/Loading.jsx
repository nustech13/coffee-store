import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import * as ReactBootstrap from 'react-bootstrap';
function Loading(){
    return(
        <div className="d-flex justify-content-center" style={{paddingTop: 200}}>
            <ReactBootstrap.Spinner animation="border" variant="success"/>
        </div>
    )
}

export default Loading;