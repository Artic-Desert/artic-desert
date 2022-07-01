import React, { useEffect } from 'react';
import { useState } from 'react';
import { useBranch } from '../../hooks/use-branch';
import { useRepo } from '../../hooks/use-repo';
import { createChat } from '../../services/ChatGroupApiService';
import { ChatGroup, Message } from '../../types/Types';
import { ChatInput } from '../ChatInputComponent/ChatInput.component';
import { ChatMessage } from '../ChatMessageComponent/ChatMessage.component';
import './Chat.css';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]); //eslint-disable-line
  const [chatGroup, setChatGroup] = useState<ChatGroup>();
  const { branch } = useBranch();
  const { repo } = useRepo();

  const createChatIfNotExist = async (
    repo_name: string,
    repo_owner: string,
    branch: string,
  ) => {
    const body = {
      name: branch,
      repo_id: `${repo_owner}:slash:${repo_name}`,
      admin: repo_owner,
      id: `${repo_owner}:slash:${repo_name}:slash:${branch}`,
    };
    const chatCreated = await createChat(body);

    setChatGroup(chatCreated);

    chatCreated && setMessages(chatCreated.messages);
  };

  useEffect(() => {
    createChatIfNotExist(repo.name, repo.owner.login, branch);
  }, []);

  return chatGroup ? (
    <div className="main-chat-container">
      {messages.length &&
        messages.map(message => {
          return <ChatMessage message={message} key={message.id} />;
        })}
      <div className="input-container">
        <ChatInput setMessages={setMessages} chatGroup={chatGroup} />
      </div>
    </div>
  ) : null;
};
