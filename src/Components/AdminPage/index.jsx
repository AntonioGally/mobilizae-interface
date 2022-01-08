import React, { useEffect, useState } from "react";

//Components
import { Navbar, Container, Nav } from "react-bootstrap";

// Data Base
import { db } from "../../firebase-config"
import { collection, getDocs } from "firebase/firestore"



const AdminPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const usersCollectionRef = collection(db, "users");

  async function getUsers() {
    setLoading(true);
    const data = await getDocs(usersCollectionRef);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  useEffect(() => {
    getUsers().finally(() => { setLoading(false) })

  }, []);

  return (
    <>
      {!loading ? (
        <>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="#home">Navbar</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          <ul>
            {users.map((value) => <li key={value.id}>{value.name}</li>)}
          </ul>
        </>
      ) : (
        <>
          <span>...Loading</span>
        </>
      )}

    </>
  )
}

export default AdminPage;