import { Container, Row, Col } from 'react-bootstrap';
import ChatNavbar from './chat/ChatNavbar';
import ChatSidebar from './chat/ChatSidebar';
import ChatMessages from './chat/ChatMessages';

const ChatLayout = () => {

  return (
    <div className="h-100">
      <div className='d-flex flex-column h-100'>
      <ChatNavbar />
      <Container className="vh-100 rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Col md={2} className="h-100 border-end px-0 bg-light flex-column d-flex">
            <ChatSidebar/>
          </Col>
          <Col className="p-0 h-100 overflow-hidden">
            <div className="d-flex flex-column h-100">
            <div className="flex-grow-1 overflow-auto"> 
              <ChatMessages />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    </div>
  );
};

export default ChatLayout;