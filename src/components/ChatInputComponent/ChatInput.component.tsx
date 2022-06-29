import React, { useState } from 'react';
import './ChatInput.css';
import { MdSend } from 'react-icons/md';

export const ChatInput: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<any[]>>; //eslint-disable-line
}> = ({ setMessages }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // TODO: Send message to the backend get it back and update new State with the created message
    // setMessages(prevState => {
    //   return [...prevState, message];
    // });
    setMessage('');
  };

  return (
    <div className="inputContainer">
      <div className="mainContainer">
        <input
          placeholder="Type your message here ..."
          className="textInput"
          aria-multiline
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button onClick={handleSendMessage} className="send-button">
          <MdSend size={23} color={'white'} />
        </button>
      </div>
    </div>
  );
};
