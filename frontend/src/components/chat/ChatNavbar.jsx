import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton.jsx';

const ChatNavbar = () => (
  <Navbar bg="white" expand="lg" className="shadow-sm">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Hexlet Chat
      </Navbar.Brand>
      <LogoutButton />
    </Container>
  </Navbar>
);

export default ChatNavbar;
