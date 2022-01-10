import React, { useEffect, useState } from "react";

//Components
import { Navbar, Container, Nav, Spinner, NavDropdown } from "react-bootstrap";
import ListPage from "./ListPage.jsx";
import ListUser from './ListUser.jsx';
import CreatePage from './CreatePage.jsx';

// Data Base
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"



const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [pages, setPages] = useState([]);
  const [tabNavigation, setTabNavigation] = useState('listUser');

  const usersCollectionRef = collection(db, "users");
  const pagesCollectionRef = collection(db, "pages");

  async function getUsers() {
    setLoading(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  async function getPages() {
    const data = await getDocs(pagesCollectionRef);
    setPages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getUsers().finally(() => { setLoading(false) });
    getPages();
  }, []);

  function getTabTemplate() {
    switch (tabNavigation) {
      case 'listUser':
        return <ListUser users={users} />
      case 'listPages':
        return <ListPage pages={pages} />
      case 'createNewPages':
        return <CreatePage />
      default:
        return 'Default option'
    }
  }

  return (
    <>
      {!loading ? (
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
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Container style={{ marginTop: 40 }}>
            {getTabTemplate()}
          </Container>

        </>
      ) : (
        <div style={{ margin: '150px auto', width: 'fit-content' }}>
          <Spinner animation="border" size="lg" />
        </div>
      )
      }

    </>
  )
}

export default AdminPage;