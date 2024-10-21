import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import AddChannelModal from './AddChannelModal';
import { fetchChannels, deleteChannel, setActiveChannel } from '../../store/slices/chatSlice';
import { useGetChannelsQuery } from '../../store/middlewares/index';
import EditChannelModal from './EditChannelModal';

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const { data: channels, isLoading } = useGetChannelsQuery();
  const { currentChannelId } = useSelector((state) => state.channels);
  const dropdownRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentChannel, setCurrentChannel] = useState(null);

  useEffect(() => {
    if (!isLoading && channels === undefined) {
      dispatch(fetchChannels());
    }
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [channels, isLoading, dispatch]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectChannel = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const handleOpenEditModal = (channel) => {
    setCurrentChannel(channel);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentChannel(null);
  };

  const handleToggleDropdown = (e, channelId) => {
    e.stopPropagation();
    setShowDropdown(showDropdown === channelId ? null : channelId);
  };

  const deleteNotify = () => {
    toast.success(`${t('channel.removed')}`);
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

  return (
    <>
      <div className="border-end px-0 bg-light d-flex flex-column h-100">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
         <b>{t('channel.channels')}</b>
         <Button
          className="p-0"
          variant="p-0 text-primary btn btn-group-vertical"
          aria-label={t('channel.add')}
          style={{
            width: '20px',
            height: '20px',
            border: '1px solid #007bff',
            borderRadius: '2px',
            backgroundColor: 'clear',
            color: '#007bff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '17px',
            padding: 0,
          }}
          onClick={handleShowModal}
        >
          +
        </Button>
         <AddChannelModal show={showModal} channels={channels} handleClose={handleCloseModal} />
        </div>
        <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels && channels.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <div className="d-flex dropdown btn-group">
              <Button
                type="button"
                key={channel.id}
                onClick={() => handleSelectChannel(channel.id)}
                variant={channel.id === currentChannelId ? 'secondary' : ''}
                className="w-100 rounded-0 text-start text-truncate"
                aria-label={channel.name}
              >
              <span className="me-1">#</span>
              {channel.name}
              </Button>
              {channel.removable && (
                <Button
                  type="button"
                  className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
                  variant={channel.id === currentChannelId ? 'secondary' : ''}
                  aria-expanded="false"
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleToggleDropdown(e, channel.id)}>
                  <span className="visually-hidden">
                    {t('channel.menu')}
                  </span>
                </Button>
              )}
            </div>
            {channel.removable && showDropdown === channel.id && (
              <div style={{ position: 'relative' }}>
                <Dropdown
                  show={showDropdown === channel.id}
                  ref={dropdownRef}
                  className="dropdown-menu show"
                  style={{
                    position: 'absolute',
                    inset: '0px auto auto 0px',
                    transform: 'translate(-7px, 36px)',
                  }}
                >
                  <Dropdown.Item as="button" size="sm" onClick={() => handleOpenEditModal(channel.id)}>
                    {t('channel.rename')}
                  </Dropdown.Item>
                  <Dropdown.Item as="button" size="sm" onClick={() => handleDeleteChannel(channel.id)}>
                    {t('channel.remove')}
                  </Dropdown.Item>
                </Dropdown>
              </div>
            )}
          </li>
        ))}
      </ul>
      </div>

      <EditChannelModal
      show={showEditModal}
      channels={channels}
      handleClose={handleCloseEditModal}
      actualChannel={currentChannel} />
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        backdrop="static"
      >
        <div className="modal-content">
          <Modal.Header>
            <Modal.Title>{t('channel.remove')}</Modal.Title>
            <Button
              variant="close"
              aria-label="Close"
              onClick={handleCloseDeleteModal}
            />
          </Modal.Header>
          <Modal.Body>
            <p className="lead">{t('modal.confirmation')}</p>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                {t('modal.cancel')}
              </Button>
              <Button
                variant="danger"
                onClick={confirmDeleteChannel}
                className="ms-2"
              >
                {t('modal.confirm')}
              </Button>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
};

export default ChatSidebar;
