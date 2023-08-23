import React, { useState, useEffect } from 'react';
import Chat from './Chat'
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const PDFView = () => {
    return (
      <div className="main-view">
        {/* Display the car insurance policies document here */}
        <iframe src="https://www.coverwise.co.uk/Documents/UK/5/nonMed/other/2004/Platinum/6.03/ScheduleWording.pdf" width="100%" height="100%" title="PDF Viewer"></iframe>
      </div>
    );
  };

export default PDFView;