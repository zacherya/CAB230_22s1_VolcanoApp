import React, {useState} from 'react';
import { AgGridReact } from "ag-grid-react";
import { Col, Row, Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

function VolcanoList(){
    const {id} = useParams();
    const [rowData] = useState([
       {make: "Toyota", model: "Celica", price: 35000},
       {make: "Ford", model: "Mondeo", price: 32000},
       {make: "Porsche", model: "Boxster", price: 72000}
   ]);
   
   const [columnDefs] = useState([
       { field: 'make' },
       { field: 'model' },
       { field: 'price' }
   ])
    return (
        <Container>
                <Row>
                    <Col sm={3}>
                        <Link to="/Volcanos">VolcTest</Link>
                    </Col>
                    <Col sm={9}>
                        {id === undefined ? (<p>No BVolc</p>) : (<p>{id}</p>)}
                        <div className="ag-theme-alpine" style={{height: 400}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}>
                        </AgGridReact>
        </div>
                    </Col>
                </Row>
            </Container>
        
    );
}

export default VolcanoList;