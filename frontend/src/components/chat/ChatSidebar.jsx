import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchChannels, deleteChannelSuccess, setActiveChannel } from '../../store/slices/chatSlice';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../../store/middlewares/index';
import ModalElements from '../modal/ModalElements';

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(null);
  const [channelToDelete, setChannelToDelete] = useState(null);
  const [channelToAdd, setChannelToAdd] = useState(null);
  const { data: channels, isLoading } = useGetChannelsQuery();
  const { currentChannelId } = useSelector((state) => state.channels);
  const dropdownRef = useRef(null);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [ removeChannel ] = useRemoveChannelMutation();

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

  const handleSelectChannel = (channelId) => {
    dispatch(setActiveChannel(channelId));
  };

  const handleOpenDeleteModal = (channelId) => {
    setChannelToDelete(channelId);
    setModalType('delete');
  };

  const handleOpenEditModal = (channel) => {
    setChannelToAdd(channel);
    setCurrentChannel(channel);
    setModalType('edit');
  };

  const handleOpenAddModal = () => {
    setModalType('create');
  };

  const handleCloseModal = () => {
    setModalType(null);
    setCurrentChannel(null);
  };

  const handleToggleDropdown = (e, channelId) => {
    e.stopPropagation();
    setShowDropdown(showDropdown === channelId ? null : channelId);
  };

  const deleteNotify = () => {
    toast.success(`${t('channel.delete')}`);
  };

  const confirmDeleteChannel = async () => {
      try {
        await removeChannel(channelToDelete).unwrap();
        deleteChannelSuccess(channelToDelete)
        handleCloseModal();
        deleteNotify();
      } catch (err) {
        console.error("Ошибка удаления:", err);
      }
  };

  if (isLoading) return <div>Loading channels...</div>;

  return (
    <>
      <div className="border-end px-0 bg-light d-flex flex-column h-100">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channel.channels')}</b>
          <Button
            className="p-0"
            variant="p-0 btn btn-group-vertical"
            aria-label={t('channel.add')}
            style={{
              width: '20px',
              height: '20px',
              border: '1px solid grey',
              borderRadius: '2px',
              backgroundColor: 'clear',
              color: 'grey',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '17px',
              padding: 0,
            }}
            onClick={handleOpenAddModal}
          >
            +
          </Button>
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
                {channel.is_removable && (
                  <Button
                    type="button"
                    className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
                    variant={channel.id === currentChannelId ? 'secondary' : ''}
                    aria-expanded="false"
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => handleToggleDropdown(e, channel.id)}
                  >
                    <span className="visually-hidden">
                      {t('channel.menu')}
                    </span>
                  </Button>
                )}
              </div>
              {channel.is_removable && showDropdown === channel.id && (
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
                    <Dropdown.Item as="button" size="sm" onClick={() => handleOpenDeleteModal(channel.id)}>
                      {t('channel.remove')}
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      {modalType && (
        <ModalElements
          show={!!modalType}
          close={handleCloseModal}
          type={modalType}
          currentChannel={currentChannel}
          confirmDeleteChannel={confirmDeleteChannel}
        />
      )}
    </>
  );
};

export default ChatSidebar;
