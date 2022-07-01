import React, { useRef, useState } from 'react';
import './ChatInput.css';
import { MdSend } from 'react-icons/md';
import { BiMailSend } from 'react-icons/bi';
import { useUser } from '../../hooks/use-user';
import { ChatGroup, Message, MessageToCreate } from '../../types/Types';
import { useRepo } from '../../hooks/use-repo';
import { postMessage } from '../../services/MessagesApiService';
import io from 'socket.io-client';

export const ChatInput: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<any[]>>; //eslint-disable-line
  chatGroup: ChatGroup;
}> = ({ setMessages, chatGroup }) => {
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const socketRef = useRef<any>();

  const handleSendMessage = async () => {
    const messageBody = {
      content: message,
      timestamp: Date.now(),
      username: user.login,
      chatgroup_id: chatGroup.id,
    };
    // TODO: Send message to the backend get it back and update new State with the created message
    const messageCreated = await postMessage(messageBody);

    socketRef.current = io('https://arctic-desert.herokuapp.com/');
    socketRef.current.emit('message', messageCreated);

    // setMessages(prevState => {
    //   return [...prevState, messageCreated];
    // });
    setMessage('');
  };

  return (
    <div className="inputContainer">
      <input
        placeholder="Type your message here ..."
        className="textInput"
        aria-multiline
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => {
          if (event.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <button onClick={handleSendMessage} className="send-button">
        <BiMailSend className="send-icon" size={40} color={'#00111c'} />
      </button>
    </div>
  );
};
