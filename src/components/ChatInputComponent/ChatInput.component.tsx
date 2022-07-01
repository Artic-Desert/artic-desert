import React, { useState } from 'react';
import './ChatInput.css';
import { MdSend } from 'react-icons/md';
import { BiMailSend } from 'react-icons/bi';
import { useUser } from '../../hooks/use-user';

export const ChatInput: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<any[]>>; //eslint-disable-line
}> = ({ setMessages }) => {
  const [message, setMessage] = useState('');
  const { user } = useUser();

  const handleSendMessage = () => {
    const messageBody = {
      content: message,
      timestamp: Date.now(),
      username: user.login,
      chatgroup_id: 'testrepo/branchname',
    };
    // TODO: Send message to the backend get it back and update new State with the created message
    setMessages(prevState => {
      return [...prevState, messageBody];
    });
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
