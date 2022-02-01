import React, { useState, useEffect, useCallback, memo } from "react";
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"

//Components
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import ListPage from "./Tabs/ListPage/ListPage.jsx";
import CreatePage from './Tabs/CreatePage/CreatePage.jsx';
import EditPage from "./Tabs/EditPage/EditPage.jsx";
import UserGraph from './Tabs/UserGraph/UserGraph.jsx'
import ListUser from './Tabs/ListUser/ListUser.jsx';
import CreateQRCode from './Tabs/Tools/CreateQRCode.jsx';

//Auth
import RedirectPage from "../RedirectPage/index.jsx";
import request from "../../scripts/http/request";

//Css
import "./AdminPage.style.css";

//Assets
import logoImg from "../../assets/images/defaultPageLogo.png";

//Scripts
import { setAdminInfo } from "../../store/actions/admin";


const AdminPage = (props) => {
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
        return <CreatePage changeTab={changeTab} />
      case 'editPage':
        return <EditPage changeTab={changeTab} />
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
                  Criar Mobilização
                </NavDropdown.Item>
                {/* <NavDropdown.Item onClick={() => setTabNavigation('editPage')} disabled>
                  Editar Mobilização
                </NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="Usuários" id="dropDownUser">
                <NavDropdown.Item onClick={() => setTabNavigation('listUser')}>
                  Participantes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('listAdmins')} disabled>
                  Administradores
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Gráficos" id="dropDownGraph">
                <NavDropdown.Item onClick={() => setTabNavigation('userGraph')} disabled>
                  Participantes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('pageGraph')} disabled>
                  Mobilizações
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ferramentas" id="dropDownTools">
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

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminInfo: (data) => dispatch(setAdminInfo(data))
  }
}

export default connect(null, mapDispatchToProps)((AdminPage));