import React from "react"

//Assets
import logoImg from "../../../assets/images/defaultPageLogo.png";

//Components
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="default-page-navbar">
      <Container>
        <Navbar.Brand>
          <img src={logoImg} alt="Mobilizae logo" className="default-page-navbar-image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              Topic one
            </Nav.Link>
            <NavDropdown title="Dropdown topic" id="navbarScrollingDropdown">
              <NavDropdown.Item >
                Topic two
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;