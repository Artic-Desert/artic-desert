import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/use-user';
import { AuthService } from '../../../services/AuthService';
import { BsPeopleFill } from 'react-icons/bs';
import './UserInfo.css';

export const UserInfo: React.FC = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.resetUserSession();
    navigate('/');
  };

  return (
    <div className="dashboard-user-info">
      <div className="name-pic">
        <img src={user.avatar_url} alt="user profile pics" />
      </div>
      <div className="name">{user.name}</div>
      <div className="git-link">
        <div className="githubName">{user.login}</div>
        <a
          href={user.html_url}
          className="githubLink"
          target="_blank"
          rel="noreferrer">
          <GoMarkGithub className="git-logo" />
        </a>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      <div className="user-info-block">
        <div className="followers">
          <p>
            {' '}
            followers <BsPeopleFill /> {user.followers}
          </p>
          <p> following: {user.following}</p>
        </div>
        <div className="public-repos">
          <p>public repos:{user.public_repos}</p>
        </div>
        <div className="public-bio">
          <p>bio:{user.bio}</p>
        </div>
      </div>
    </div>
  );
};
