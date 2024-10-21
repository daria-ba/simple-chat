import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ChatNavbar from './chat/ChatNavbar';
import ChatSidebar from './chat/ChatSidebar';
import ChatMessages from './chat/ChatMessages';

const ChatLayout = () => {

  return (
    <div className="vh-100 bg-light">
      <div className="h-100 d-flex flex-column">
        <ChatNavbar />
        <Container className="h-100 my-4 overflow-hidden rounded shadow">
          <Row className="h-100 bg-white flex-md-row">
            <Col xs={4} md={2} className="p-0">
              <ChatSidebar/>
            </Col>
            <Col className="p-0 h-100">
                <ChatMessages />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ChatLayout;
