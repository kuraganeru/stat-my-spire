import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const AppNavigation = (props) => {

    return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Stat the Spire</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AppNavigation