import React from 'react';
import { useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/middlewares/index';
import { useGetMessagesQuery } from '../../store/middlewares/index';
import MessageInput from './MessageInput';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ChatMessages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const { data: channels } = useGetChannelsQuery()
  const { data: messages, error } = useGetMessagesQuery();

  useEffect(() => {
  if (error?.status === 401) {
    navigate('/login');
  }
}, [error, navigate]); 

  const channel = channels?.find(({ id }) => id === currentChannelId);
  const filteredMessages = messages?.filter((message) => message.channelId === currentChannelId);

  return (
<>
  <div className="p-0 h-100 d-flex flex-column">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold">{`# ${channel?.name}`}</p>
      <span className="text-muted">{`${filteredMessages?.length} ${t('message.messageCount', { count: filteredMessages?.length })}`}</span>
    </div>

    <div id="messages-box" className="chat-messages overflow-auto px-5">
      {filteredMessages?.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>{': '}
          {message.body}
        </div>
      ))}
    </div>
    <div className="mt-auto px-5 py-3">
    <MessageInput />
    </div>
    </div>
</>
  )
};

export default ChatMessages;