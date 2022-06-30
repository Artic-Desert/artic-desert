import React from 'react';
import { GoGitBranch } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import './Header.css';
import { useUser } from '../../../hooks/use-user';

export const Header: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="kanban-header">
      <div className="left">
        <div className="branch-name">
          <GoGitBranch />
          <span>main</span>
          <AiFillCaretDown fontSize="14px" />
        </div>
        <div className="num-branches">
          <GoGitBranch />
          <span>7 branches</span>
        </div>
        <div className="collaborators">
          <img src={require('../../../assets/andres.jpeg')} alt="" />
          <img src={require('../../../assets/xavi.png')} alt="" />
          <img src={require('../../../assets/sebas.png')} alt="" />
          <img src={require('../../../assets/alex.png')} alt="" />
        </div>
      </div>
      <div className="right">
        <div className="user-info">
          <span>Hello {user.name.split(' ')[0]}!</span>
          <img src={user.avatar_url} alt="" />
        </div>
      </div>
    </div>
  );
};
