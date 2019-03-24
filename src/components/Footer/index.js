import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './styles.css';

export class Footer extends Component {
  render() {
    return (
      <Navbar className="header">
        <Navbar.Brand className="title">Mission Find Falcone</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Footer;
