import React from 'react';
import { GoGitBranch } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import './Header.css';

export const Header: React.FC = () => {
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
          <span>Hello Andres!</span>
          <img src={require('../../../assets/andres.jpeg')} alt="" />
        </div>
      </div>
    </div>
  );
};
