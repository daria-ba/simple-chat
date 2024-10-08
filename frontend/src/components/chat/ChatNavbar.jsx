import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutButton from '../logoutButton';

const ChatNavbar = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Chat
      </Navbar.Brand>
      <LogoutButton />
    </Container>
  </Navbar>
);

export default ChatNavbar;