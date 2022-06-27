import React, { useState } from 'react';

import { MdSend } from 'react-icons/md';

export const ChatInput: React.FC<{
  setMessages: React.Dispatch<React.SetStateAction<any[]>>; //eslint-disable-line
}> = ({ setMessages }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // TODO: Send message to the backend get it back and update new State with the created message
    setMessages(prevState => {
      return [...prevState, message];
    });
    setMessage('');
  };

  return (
    <div className="container">
      <div className="mainContainer">
        <input
          placeholder="Type your message here ..."
          className="textInput"
          aria-multiline
          value={message}
          onChange={event => setMessage(event.target.value)}
        />
        <button onClick={handleSendMessage}>
          <MdSend />
        </button>
      </div>
    </div>
  );
};
