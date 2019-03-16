import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import './style.css';

class Header extends Component {
  render() {
    return (
      <Navbar className="header">
        <Navbar.Brand className="title">Finding Falcone!</Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;