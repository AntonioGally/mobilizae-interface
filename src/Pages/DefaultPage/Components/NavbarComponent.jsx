import React from "react"

//Assets
import logoImg from "../../../assets/images/defaultPageLogo.png";

//Components
import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="default-page-navbar">
      <Container>
        <Navbar.Brand>
          <img src={logoImg} alt="Mobilizae logo" className="default-page-navbar-image" />
        </Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
        <Navbar.Collapse id="responsive-navbar-nav" style={{ justifyContent: "flex-end" }}>
          <Nav>
            {localStorage.getItem("access_token") && (
              <Nav.Link href="#/admin">
                Administração
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;