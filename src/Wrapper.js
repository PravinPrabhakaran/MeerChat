import React, { useState, useEffect } from 'react';
import App from './App'
import PDFView from './PDFView'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


function Wrapper() {

    return (
        <Container fluid style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: '7'}}>
          {/* First container (70% width) */}
          <PDFView />
        </div>
        <div style={{ flex: '3'}}>
          {/* Second container (30% width) */}
          <App />
        </div>
      </Container>
    )

}

export default Wrapper;