import moment from 'moment';
import React from 'react';
import { AuthService } from '../../services/AuthService';

import './ChatMessage.css';

//eslint-disable-next-line
export const ChatMessage: React.FC<any> = ({ message }) => {
  const isMyMessage = () => {
    return AuthService.getToken() === message.userid;
  };
  return (
    <div className="container">
      <div className="messageBox">
        {!isMyMessage() && <h5 className="author">{message.user.name}</h5>}
        {/*Or wherever the name is stored */}
        <div className="content">{message.content}</div>
        <div className="time">{moment(message.createdAt).format('HH:MM')}</div>
      </div>
    </div>
  );
};
