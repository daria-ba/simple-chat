import { useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../../store/middlewares/index';
import { useGetMessagesQuery, useAddMessageMutation } from '../../store/middlewares/index';
import MessageInput from './MessageInput';


const ChatMessages = () => {
  const { channels, currentChatId } = useSelector((state) => state.channels);
  const activeChannelId = useSelector((state) => state.currentChatId);
  const { data: messages } = useGetMessagesQuery();

  console.log(`this is current chat id ${currentChatId}`)

  // console.log(`this is channels list ${JSON.stringify(channels)}`)
  // console.log(`this is current chat id list ${currentChatId}`)
  // console.log(`this is active channel ${activeChannelId}`)

  const channel = channels?.find(({ id }) => id === currentChatId);
  const filteredMessages = messages?.filter((message) => message.channelId === currentChatId);

  return (
<>
  <div className="d-flex flex-column h-100">
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0 fw-bold">{`# ${channel?.name}`}</p>
      <span className="text-muted">{filteredMessages?.length} messages</span>
    </div>

    <div className="mb-2 text-break flex-grow-1 overflow-auto px-3">
      {filteredMessages?.map((message) => (
        <div key={message.id}>
          <b>{message.username}</b>{': '}
          {message.body}
        </div>
      ))}
    </div>
    <div className="mt-auto p-3">
      <MessageInput />
    </div>
  </div>
</>
  )
};

export default ChatMessages;