import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery, useGetMessagesQuery, useRemoveMessageMutation } from '../../store/middlewares/index';
import { Button } from 'react-bootstrap';
import { DateTime } from "luxon";
import ContextMenu from './ContextMenu';

const ChatMessages = () => {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { userId } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: channels } = useGetChannelsQuery();
  const { data: messages, error } = useGetMessagesQuery(currentChannelId);
  const [ removeMessage ] = useRemoveMessageMutation();

  useEffect(() => {
    if (error?.status === 401) {
      navigate('/signin');
    }
  }, [error, navigate]);

  const channel = channels?.find(({ id }) => id === currentChannelId);

  const handleRemoveMessage = async (messageId, userId) => {
      try {
        await removeMessage({ messageId, userId }).unwrap();
        console.log("Message удалён");
      } catch (err) {
        console.error("Ошибка удаления:", err);
      }
  };

  return (
    <div className="p-0 h-100 d-flex flex-column">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0 fw-bold">{`# ${channel?.name}`}</p>
        <span className="text-muted">{`${messages?.length} ${t('message.messageCount', { count: messages?.length })}`}</span>
      </div>

      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {messages?.map((message) => {

          const serverTime = message.created_at;
          const localTime = DateTime.fromISO(serverTime + "Z", { zone: "utc" }).toLocal().toFormat("HH:mm");

          return(
          <div key={message.id}>
            <b>{message.users?.login}</b>
            {': '}<br />
            {message.content} <br />
            <small style={{ textAlign: "right", display: "block" }}>at {localTime}</small>
            {message.user_id === userId ? 
              // <ContextMenu />
            <Button
            className='bg-transparent border-black text-xs p-1 text-black'
            onClick={() => handleRemoveMessage(message.id, userId)}
            >
              Удалить
            </Button>
            : <span></span> }
          </div>
        );
        })}
      </div>
    </div>
  );
};

export default ChatMessages;
