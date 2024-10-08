import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addChannel, setActiveChannel } from '../../store/slices/chatSlice';

const AddChannelModal = ({ show, handleClose }) => {
    const [newChannelName, setNewChannelName] = useState('');
    const dispatch = useDispatch();
  
    const handleAddChannel = () => {
        console.log('a')
      if (newChannelName.trim()) {
        const newChannel = { 
          id: Date.now(),
          name: newChannelName 
        };
  
        dispatch(addChannel(newChannel));
        dispatch(setActiveChannel(newChannel.id));

        setNewChannelName('');
        handleClose();
      }
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="channelName">
              <Form.Label>Channel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter channel name"
                value={newChannelName}
                onChange={(e) => setNewChannelName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleAddChannel}>
            Добавить чат
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  
  export default AddChannelModal;