import React, { useEffect, useState } from "react";

//Components
import { Navbar, Container, Nav, Spinner } from "react-bootstrap";
import ListUser from './ListUser.jsx';
import CreatePage from './CreatePage.jsx';

// Data Base
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"



const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [tabNavigation, setTabNavigation] = useState('listUser');

  const usersCollectionRef = collection(db, "users");

  async function getUsers() {
    setLoading(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  useEffect(() => {
    getUsers().finally(() => { setLoading(false) })
  }, []);

  function getTabTemplate() {
    switch (tabNavigation) {
      case 'listUser':
        return <ListUser users={users} />
      case 'listGroup':
        return <span>List Group</span>
      case 'createNewPages':
        return <CreatePage />
      case 'createNewGroups':
        return <span>Create new Groups</span>
      default:
        return 'Default option'
    }
  }

  return (
    <>
      {!loading ? (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>Admin</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link className={tabNavigation === 'listUser' ? 'active' : ''}
                  onClick={() => setTabNavigation('listUser')}>
                  Listar usuários
                </Nav.Link>
                <Nav.Link className={tabNavigation === 'listGroup' ? 'active' : ''}
                  onClick={() => setTabNavigation('listGroup')}>
                  Listar grupos
                </Nav.Link>
                <Nav.Link className={tabNavigation === 'createNewPages' ? 'active' : ''}
                  onClick={() => setTabNavigation('createNewPages')}>
                  Cadastrar nova página
                </Nav.Link>
                <Nav.Link className={tabNavigation === 'createNewGroups' ? 'active' : ''}
                  onClick={() => setTabNavigation('createNewGroups')}>
                  Cadastrar grupos
                </Nav.Link>
              </Nav>
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
      )}

    </>
  )
}

export default AdminPage;