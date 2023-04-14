import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux"
import { useHistory } from "react-router-dom";

//Components
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

//page
import ListPage from "./Tabs/ListPage/ListPage.jsx";
import CreatePage from './Tabs/CreatePage/CreatePage.jsx';
import EditPage from "./Tabs/EditPage/EditPage.jsx";
//user
import ListUser from './Tabs/ListUser/ListUser.jsx';
//Graph
import UserGraph from './Tabs/UserGraph/UserGraph.jsx'
import PageGraph from "./Tabs/PageGraph/PageGraph.jsx";
//admin
import ListAdmin from './Tabs/ListAdmin/ListAdmin.jsx';
import CreateAdmin from './Tabs/CreateAdmin/CreateAdmin.jsx';
import EditAdmin from './Tabs/EditAdmin/EditAdmin.jsx';
//tools
import CreateQRCode from './Tabs/Tools/CreateQRCode.jsx';
//Profile
import Profile from "./Tabs/Profile/Profile.jsx";


//Auth
import request from "../../scripts/http/request";

//Css
import "./AdminPage.style.css";

//Assets
import logoImg from "../../assets/images/defaultPageLogo.png";

//Store
import { setAdminInfo } from "../../store/actions/admin";
import { setCompanyInfo } from "../../store/actions/company";



const AdminPage = (props) => {
  const [tabNavigation, setTabNavigation] = useState('listPages');
  const history = useHistory()
  function changeTab(tab) {
    setTabNavigation(tab)
  }

  const getTabTemplate = useMemo(() => {
    switch (tabNavigation) {
      case 'listUser':
        return <ListUser />
      case 'listAdmin':
        return <ListAdmin changeTab={changeTab} />
      case 'editAdmin':
        return <EditAdmin changeTab={changeTab} />
      case 'createNewAdmin':
        return <CreateAdmin changeTab={changeTab} />
      case 'listPages':
        return <ListPage changeTab={changeTab} />
      case 'createNewPages':
        return <CreatePage changeTab={changeTab} />
      case 'editPage':
        return <EditPage changeTab={changeTab} />
      case 'userGraph':
        return <UserGraph />
      case 'pageGraph':
        return <PageGraph />
      case 'profileConfig':
        return <Profile changeTab={changeTab} />
      case 'createQRCode':
        return <CreateQRCode />
      default:
        return 'Default option'
    }
  }, [tabNavigation])

  function postToken() {
    return new Promise((resolve, reject) => {
      request.post("/validateToken", { token: localStorage.getItem("access_token"), companyInfo: props.companyInfo })
        .then((data) => { resolve(data.data) })
        .catch((err) => { reject(err) })
    })
  }

  function getCompanyInfo() {
    return new Promise((resolve, reject) => {
      var host = window.location.host
      var subdomain = host.split('.')[0];
      if (
        subdomain === undefined
        || subdomain === "www"
        || subdomain.indexOf("localhost") > -1
        || subdomain.indexOf("mobilizae") > -1
      ) {
        subdomain = "limasbebidas"
      }
      console.log("Getting data from -> ", host, subdomain)
      request.get(`/companyInfo/${subdomain}`)
        .then((data) => { resolve(data.data); })
        .catch((err) => { reject(err); })
    })
  }

  function getPages(companyId) {
    return new Promise((resolve, reject) => {
      request.get(`/public/pages/${companyId}`)
        .then((data) => { resolve(data.data) })
        .catch((err) => { reject(err) })
    })
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    history.push("/");
  }

  useEffect(() => {
    if (props.companyInfo && !props.adminInfo) {
      postToken().then((data) => props.setAdminInfo(data))
    }
  }, [props.companyInfo]);

  useEffect(() => {
    if (!props.companyInfo) {
      getCompanyInfo()
        .then((companyInfoData) => {
          props.setCompanyInfo(companyInfoData);

          getPages(companyInfoData.id)
            .then((pagesData) => {
              props.setPageList(pagesData);
            })
        });
    }
  }, [history, props.companyInfo])

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="default-page-navbar">
        <Container>
          <Navbar.Brand>
            <img src={logoImg} alt="Mobilizae logo" className="default-page-navbar-image" onClick={() => setTabNavigation("listPages")} />
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
              </NavDropdown>
              <NavDropdown title="Usuários" id="dropDownUser">
                <NavDropdown.Item onClick={() => setTabNavigation('listUser')}>
                  Participantes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('listAdmin')}>
                  Administradores
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Gráficos" id="dropDownGraph">
                <NavDropdown.Item onClick={() => setTabNavigation('userGraph')}>
                  Participantes
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => setTabNavigation('pageGraph')}>
                  Mobilizações
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ferramentas" id="dropDownTools">
                <NavDropdown.Item onClick={() => setTabNavigation('createQRCode')}>
                  Gerar QR Code
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <NavDropdown title="Perfil" id="dropDownProfile">
              <NavDropdown.Item onClick={() => setTabNavigation('profileConfig')}>
                Configurações
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>
                Sair
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="admin-page-wrapper">
        {getTabTemplate}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    adminInfo: state.admin.adminInfo,
    companyInfo: state.company.companyInfo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAdminInfo: (data) => dispatch(setAdminInfo(data)),
    setCompanyInfo: (data) => dispatch(setCompanyInfo(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);