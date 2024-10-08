import { useSelector, useDispatch } from 'react-redux';
import { fetchChannels, addChannel, updateChannel, deleteChannel, setActiveChannel } from '../../store/slices/chatSlice';
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Nav } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
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

  const handleDeleteChannel = (channelId) => {
    dispatch(deleteChannel(channelId));
  };

  if (isLoading) return <div>Loading channels...</div>;
  if (error) return <div>Error loading channels</div>;


  return (
    <>
      <div className="bg-light p-3">
        <b>Channels</b>
        <Button
        className="p-0"
        variant="outline-secondary"
        // type="submit"
          // variant="link"
          // className="p-0 text-primary"
          onClick={handleShowModal}
        >
          +
        </Button>
        <AddChannelModal show={showModal} handleClose={handleCloseModal} />
      </div>
      <Nav className="flex-column nav-pills nav-fill px-2 mb-3">
        {channels.map((channel) => (
          <Nav.Item key={channel.id}>
            <Button
              onClick={() => handleSelectChannel(channel.id)}
              variant={channel.id === currentChatId ? 'secondary' : ''}
              className="w-100 rounded-0 text-start d-flex justify-content-between"
            >
              <span className="me-1">#</span>
              {channel.name}
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
          </Nav.Item>
        ))}
      </Nav>
    </>
  );
};


export default ChatSidebar;