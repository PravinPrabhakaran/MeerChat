import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const PDFView = () => {
    return (
      <div className="main-view">
        {/* Display the car insurance policies document here */}
        <iframe src="https://crystalreports.blob.core.windows.net/taurus-docs-static/SOTI_IDOL_202304.pdf" width="100%" height="100%" title="PDF Viewer"></iframe>
      </div>
    );
  };

export default PDFView;