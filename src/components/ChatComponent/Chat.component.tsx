import React from 'react';
import { useState } from 'react';
import { ChatInput } from '../ChatInputComponent/ChatInput.component';
import { ChatMessage } from '../ChatMessageComponent/ChatMessage.component';
import './Chat.css';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]); //eslint-disable-line

  return (
    <div className="container">
      {messages &&
        messages.map(message => {
          return <ChatMessage message={message} key={message.id} />;
        })}
      <ChatInput setMessages={setMessages} />
    </div>
  );
};
