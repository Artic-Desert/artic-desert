import moment from 'moment';
import React from 'react';
import { useUser } from '../../hooks/use-user';
import './ChatMessage.css';

import './ChatMessage.css';

//eslint-disable-next-line
export const ChatMessage: React.FC<any> = ({ message }) => {
  const { user } = useUser();

  const isMyMessage = () => {
    return user.login === message.username;
  };
  return (
    <div className="container">
      <div className={isMyMessage() ? 'usersMessageBox' : 'messageBox'}>
        {!isMyMessage() && <h5 className="author">{message.username}</h5>}
        <div className="content">{message.content}</div>
        <div className="time">{moment(message.timestamp).format('HH:MM')}</div>
      </div>
    </div>
  );
};
