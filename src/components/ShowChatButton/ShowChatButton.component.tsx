import React, { useState } from 'react';
import { ResizableChat } from '../ResizableChatComponent/ResizableChat.component';
import { TbBrandHipchat } from 'react-icons/tb';

import './ShowChatButton.css';

export const ShowChatButton: React.FC = () => {
  const [chat, setChat] = useState(false);

  const onClick = () => setChat(!chat);

  return (
    <div className="show-chat-button-main-container">
      <div className="chat-container">{chat ? <ResizableChat /> : null}</div>
      <button title="Chat" className="chat-button" onClick={onClick}>
        <TbBrandHipchat size={40} color="lightgrey" />
      </button>
    </div>
  );
};
