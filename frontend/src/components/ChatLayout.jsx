import React, {useState} from 'react';
import { Container, Row, Col, Offcanvas, Button } from 'react-bootstrap';
import ChatNavbar from './chat/ChatNavbar';
import ChatSidebar from './chat/ChatSidebar';
import ChatMessages from './chat/ChatMessages';
import MessageInput from './chat/MessageInput';

const ChatLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const handleCloseSidebar = () => setShowSidebar(false);
  
  return (
    <Container fluid className='vh-100 d-flex flex-column'>
      <Row className='flex-shrink-0'>
        <ChatNavbar />
      </Row>
      <Row className="d-md-none p-2">
        <Col xs={12} className="text-left">
          <Button variant="secondary" onClick={toggleSidebar}>Чаты</Button>
        </Col>
      </Row>
      <Row className="d-flex h-100">
        <Col xs={3} md={2} className="d-none d-md-block d-flex flex-column p-0">
          <ChatSidebar onClick={handleCloseSidebar}/>
        </Col>
        <Col className="d-flex flex-column p-0">
          <div className="flex-grow-1 overflow-auto">
            <ChatMessages />
          </div>
          <div className="sticky-bottom bg-white">
            <MessageInput />
          </div>
        </Col>
      </Row>
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Чаты</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ChatSidebar onClose={handleCloseSidebar} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  )
};

export default ChatLayout;
