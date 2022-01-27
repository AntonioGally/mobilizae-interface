import React, { useState } from "react";
import { useHistory } from "react-router-dom"
//Components
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import ListPage from "./Tabs/ListPage/ListPage.jsx";
import CreatePage from './Tabs/CreatePage/CreatePage.jsx';
import UserGraph from './Tabs/UserGraph/UserGraph.jsx'
import ListUser from './Tabs/ListUser/ListUser.jsx';
import CreateQRCode from './Tabs/Tools/CreateQRCode.jsx';

//Css
import "./AdminPage.style.css";

//Assets
import logoImg from "../../assets/images/defaultPageLogo.png";


const AdminPage = () => {
  const history = useHistory();
  const [tabNavigation, setTabNavigation] = useState('listPages');

  function changeTab(tab) {
    setTabNavigation(tab)
  }

  function getTabTemplate() {
    switch (tabNavigation) {
      case 'listUser':
        return <ListUser />
      case 'listPages':
        return <ListPage changeTab={changeTab} />
      case 'createNewPages':
        return <CreatePage />
      case 'userGraph':
        return <UserGraph />
      case 'createQRCode':
        return <CreateQRCode />
      default:
        return 'Default option'
    }
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="default-page-navbar">
        <Container>
          <Navbar.Brand>
            <img src={logoImg} alt="Mobilizae logo" className="default-page-navbar-image" onClick={() => history.push("/")} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Mobilizações" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => setTabNavigation('listPages')}>
                  Listar Mobilizações
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('createNewPages')}>
                  Criar Mobilizações
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className={tabNavigation === 'listUser' ? 'active' : ''}
                onClick={() => setTabNavigation('listUser')}>
                Participantes
              </Nav.Link>
              <NavDropdown title="Gráficos" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => setTabNavigation('userGraph')}>
                  Participantes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('pageGraph')} disabled>
                  Páginas
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ferramentas" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => setTabNavigation('createQRCode')}>
                  Gerar QR Code
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="admin-page-wrapper">
        {getTabTemplate()}
      </div>
    </>
  )
}

export default AdminPage;