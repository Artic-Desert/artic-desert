import React, { useState } from 'react';
import { ResizableChat } from '../ResizableChatComponent/ResizableChat.component';
import { TbBrandHipchat } from 'react-icons/tb';
import { GrChatOption } from 'react-icons/gr';
import { IoMdArrowDropleft } from 'react-icons/io';

import './ShowChatButton.css';

export const ShowChatButton: React.FC = () => {
  const [chat, setChat] = useState(false);

  const onClick = () => setChat(!chat);

  return (
    <div className="show-chat-button-main-container">
      <div className="chat-container">{chat ? <ResizableChat /> : null}</div>
      <button title="Chat" className="chat-button" onClick={onClick}>
        {/* <TbBrandHipchat size={40} color="lightgrey" /> */}
        <GrChatOption className="chat-icon" size={30} />
        <p>Team Chat</p>
        <IoMdArrowDropleft className="chat-left-arrow" size={30} />
      </button>
    </div>
  );
};
