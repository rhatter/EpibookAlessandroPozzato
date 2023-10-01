import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./NavBar.css";

function MyNavBar({}) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary NavBar">
        <Container fluid>
          <Navbar.Brand href="/">
            <img
              src="https://i.pinimg.com/564x/18/18/88/18188820e5da19a3908aeb18af5246b5.jpg"
              alt="bookLogo"
            />
            BookiFly
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default MyNavBar;
