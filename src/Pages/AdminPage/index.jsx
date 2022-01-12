import React, { useEffect, useState } from "react";

//Components
import { Navbar, Container, Nav, Spinner, NavDropdown } from "react-bootstrap";
import ListPage from "./Tabs/Pages/ListPage.jsx";
import CreatePage from './Tabs/Pages/CreatePage.jsx';
import ListUser from './Tabs/User/ListUser.jsx';
import CreateQRCode from './Tabs/Tools/CreateQRCode.jsx';

// Data Base
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"

//Css
import "../../styles/admin.css";



const AdminPage = () => {
  const [tabNavigation, setTabNavigation] = useState('listUser');



  function getTabTemplate() {
    switch (tabNavigation) {
      case 'listUser':
        return <ListUser />
      case 'listPages':
        return <ListPage />
      case 'createNewPages':
        return <CreatePage />
      case 'createQRCode':
        return <CreateQRCode />
      default:
        return 'Default option'
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className={tabNavigation === 'listUser' ? 'active' : ''}
                onClick={() => setTabNavigation('listUser')}>
                Listar usuários
              </Nav.Link>
              <NavDropdown title="Páginas" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => setTabNavigation('listPages')}>
                  Listar páginas
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('createNewPages')}>
                  Criar páginas
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className={tabNavigation === 'createQRCode' ? 'active' : ''}
                onClick={() => setTabNavigation('createQRCode')}>
                Criar QR Code
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: 40 }}>
        {getTabTemplate()}
      </Container>
    </>
  )
}

export default AdminPage;