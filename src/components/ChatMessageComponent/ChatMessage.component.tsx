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
      <div className={isMyMessage() ? 'usersMessageBox' : 'message-Box'}>
        {/* {!isMyMessage() && <h5 className="author">{message.username}</h5>} */}
        <div className="message-author-pic">
          <img src={message.avatar_url} alt="" />
          <h5 className="author">{message.username}</h5>
        </div>
        <div className="content">{message.content}</div>
        <div className="time">
          {moment(parseInt(message.timestamp)).format('HH:MM')}⋉
        </div>
      </div>
    </div>
  );
};
