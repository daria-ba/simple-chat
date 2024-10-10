import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../../store/middlewares/index';
import { useGetMessagesQuery, useAddMessageMutation } from '../../store/middlewares/index';
import MessageInput from './MessageInput';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { clearAuthData } from '../../store/slices/authSlice'

const ChatMessages = () => {
  const dispatch = useDispatch();
  const { channels, currentChatId } = useSelector((state) => state.channels);
  const navigate = useNavigate();
  //вытащить статус
  //
  const activeChannelId = useSelector((state) => state.currentChatId);
  const { data: messages, error, isLoading } = useGetMessagesQuery(); //вытащить статус и обработать
  //401 - перенаправляется на логин

  // const err = error;
  // console.log(err);
  useEffect(() => {
    console.log(`this is error messages ${JSON.stringify(error)}`)
  if (error?.status === 401) {
    navigate('/login');
    // localStorage.removeItem('user');
    // dispatch(clearAuthData());  
  }
}, [error, navigate]); 

// if (error) {
//   return <div>Произошла ошибка при загрузке сообщений</div>; // Обрабатываем другие ошибки
// }

  // console.log(`this is channels list ${JSON.stringify(channels)}`)
  // console.log(`this is current chat id list ${currentChatId}`)
  // console.log(`this is active channel ${activeChannelId}`)

  const channel = channels?.find(({ id }) => id === currentChatId);
  const filteredMessages = messages?.filter((message) => message.channelId === currentChatId);

  return (
<>
  <div className="p-0 h-100 d-flex flex-column">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold">{`# ${channel?.name}`}</p>
      <span className="text-muted">{filteredMessages?.length} messages</span>
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