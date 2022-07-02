import React, { useRef, useState } from 'react';
import { BiMailSend } from 'react-icons/bi';
import { useUser } from '../../hooks/use-user';
import { ChatGroup } from '../../types/Types';
import { postMessage } from '../../services/MessagesApiService';
import io from 'socket.io-client';
import { useBranch } from '../../hooks/use-branch';
import { GoGitBranch } from 'react-icons/go';
import './ChatInput.css';

export const ChatInput: React.FC<{
  chatGroup: ChatGroup;
}> = ({ chatGroup }) => {
  const [message, setMessage] = useState('');
  const { user } = useUser();
  const socketRef = useRef<any>(); // eslint-disable-line

  const handleSendMessage = async () => {
    const messageBody = {
      content: message,
      timestamp: Date.now(),
      username: user.login,
      chatgroup_id: chatGroup.id,
      avatar_url: user.avatar_url,
    };

    console.log(messageBody);
    // TODO: Send message to the backend get it back and update new State with the created message
    const messageCreated = await postMessage(messageBody);

    console.log(messageCreated);

    socketRef.current = io('https://arctic-desert.herokuapp.com');
    socketRef.current.emit('message', messageCreated);

    // setMessages(prevState => {
    //   return [...prevState, messageCreated];
    // });
    setMessage('');
  };
  const branch = useBranch();
  console.log('LA BRANCA', branch);

  return (
    <div className="inputContainer">
      <input
        placeholder={`Message Branch ● ${branch.branch}`}
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
