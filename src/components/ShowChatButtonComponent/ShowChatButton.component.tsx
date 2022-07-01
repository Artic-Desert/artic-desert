import React, { useState } from 'react';
import { ResizableChat } from '../ResizableChatComponent/ResizableChat.component';
import { IoMdArrowDropleft, IoMdChatbubbles } from 'react-icons/io';

import './ShowChatButton.css';

export const ShowChatButton: React.FC = () => {
  const [chat, setChat] = useState(false);

  const onClick = () => setChat(!chat);

  return (
    <div className="show-chat-button-main-container">
      <div className="chat-container">{chat ? <ResizableChat /> : null}</div>
      <button title="Show Chat" className="chat-button" onClick={onClick}>
        <IoMdChatbubbles className="chat-icon" size={30} color="white" />
        <p>Team Chat</p>
        {!chat ? (
          <IoMdArrowDropleft className="chat-left-arrow" size={30} />
        ) : (
          <IoMdArrowDropleft className="chat-right-arrow" size={30} />
        )}
      </button>
    </div>
  );
};
