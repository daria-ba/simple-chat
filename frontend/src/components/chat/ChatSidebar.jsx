import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels, addChannel, updateChannel, deleteChannel, setActiveChannel } from '../../store/slices/chatSlice';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const { channels, isLoading, error, currentChatId } = useSelector((state) => state.channels);

  useEffect(() => {
    if (channels.length === 0) {
    dispatch(fetchChannels());
    }
  }, [dispatch, channels.length]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectChannel = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const handleUpdateChannel = (channelId) => {
    const updatedChannel = { id: channelId, name: 'New Channel Name' };
    dispatch(updateChannel(updatedChannel));
  };

  const handleToggleDropdown = (e, channelId) => {
    e.stopPropagation();
    setShowDropdown(showDropdown === channelId ? null : channelId);
  };

  const deleteNotify = () => {
    console.log('delete!!')
    toast.success("Канал успешно удален!");
  };

  const handleDeleteChannel = (channelId) => {
    setChannelToDelete(channelId);
    setShowDeleteModal(true);
  };

  const confirmDeleteChannel = () => {
    if (channelToDelete) {
      dispatch(deleteChannel(channelToDelete));
      setShowDeleteModal(false);
      setChannelToDelete(null);
      deleteNotify();
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setChannelToDelete(null);
  };

  if (isLoading) return <div>Loading channels...</div>;

  // useEffect(() => {
  //   if (error && error.status === 401) { // Добавлена проверка на наличие error
  //     navigate('/'); // Перенаправляем на страницу входа при ошибке 401
  //   }
  // }, [error, navigate]);
  if (error) { navigate('/login');};


  return (
    <>
       <div className="border-end px-0 bg-light d-flex flex-column h-100">
       <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Channels</b>
        <Button
        className="p-0"
        variant="p-0 text-primary btn btn-group-vertical"
        // type="submit"
          // variant="link"
          // className="p-0 text-primary"
          onClick={handleShowModal}
        >
          +
        </Button>
        <AddChannelModal show={showModal} handleClose={handleCloseModal} />
      </div>
      <ul className="h-100 d-block flex-column nav nav-pills nav-fill px-2 mb-3 overflow-auto">
        {channels.map((channel) => (
          <li key={channel.id}>
            <Button
              onClick={() => handleSelectChannel(channel.id)}
              variant={channel.id === currentChatId ? 'secondary' : ''}
              className="w-100 rounded-0 text-start d-flex justify-content-between"
            >
              <span className="me-1"># {channel.name}</span>
              {channel.removable && (
                <span
                  className="flex-grow-0 dropdown-toggle dropdown-toggle-split btn black"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleToggleDropdown(e, channel.id)}
                />
              )}
            </Button>
            {channel.removable && showDropdown === channel.id && (
              <div style={{ position: 'relative' }}>
                <Dropdown
                  show={showDropdown === channel.id}
                  className="dropdown-menu show"
                  style={{
                    position: 'absolute',
                    inset: '0px 0px auto auto',
                    transform: 'translate(0px, 36px)',
                  }}
                >
                  <Dropdown.Item as="button" size="sm" onClick={() => handleUpdateChannel(channel.id)}>
                    Rename
                  </Dropdown.Item>
                  <Dropdown.Item as="button" size="sm" onClick={() => handleDeleteChannel(channel.id)}>
                    Delete
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>

      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        backdrop="static"
      >
        <div className="modal-content">
          <Modal.Header>
            <Modal.Title>Удалить канал</Modal.Title>
            <Button
              variant="close"
              aria-label="Close"
              onClick={handleCloseDeleteModal}
            />
          </Modal.Header>
          <Modal.Body>
            <p className="lead">Уверены?</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Отменить
              </Button>
              <Button
                variant="danger"
                onClick={confirmDeleteChannel}
                className="ms-2"
              >
                Удалить
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};


export default ChatSidebar;