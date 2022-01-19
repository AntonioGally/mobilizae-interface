//Libs
import React from "react";

//styles
import "./DefaultPage.style.css";

//Assets
import logoImg from "../../assets/images/defaultPageLogo.png";

//Components
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"


const DefaultPage = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="default-page-navbar">
        <Container>
          <Navbar.Brand>
            <img src={logoImg} alt="Mobilizae logo" className="default-page-navbar-image" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                Listar usuários
              </Nav.Link>
              <NavDropdown title="Páginas" id="navbarScrollingDropdown">
                <NavDropdown.Item >
                  Listar páginas
                </NavDropdown.Item>
                <NavDropdown.Item >
                  Criar páginas
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default DefaultPage;