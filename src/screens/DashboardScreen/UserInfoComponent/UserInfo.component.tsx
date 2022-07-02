import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../../hooks/use-user';
import { AuthService } from '../../../services/AuthService';
import { BsPeopleFill, BsPeople } from 'react-icons/bs';
import { AiOutlineRead } from 'react-icons/ai';
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
      <div className="visibility-container">
        <div className="blur-layer">
          <div className="name">{user.name}</div>
          <div className="git-link">
            <div className="githubName">{user.login}</div>
            <a
              href={user.html_url}
              className="githubLink"
              target="_blank"
              rel="noreferrer">
              <GoMarkGithub className="git-logo" size={30} color="#d2d8dd" />
            </a>
          </div>
          <div className="user-info-block">
            <div className="followers">
              <p>
                Followers • <BsPeopleFill color="#d2d8dd" />{' '}
                <span className="user-highlight">{user.followers}</span>
              </p>
              <p>
                Following • <BsPeople color="#d2d8dd" />{' '}
                <span className="user-highlight">{user.following}</span>
              </p>
            </div>
            <div className="public-repos">
              <p>
                Public repos •{' '}
                <span className="user-highlight">{user.public_repos}</span>
              </p>
            </div>
            <div className="public-bio">
              <p>
                Bio <AiOutlineRead color="#d2d8dd" />
                <p className="bio-cont"> • {user.bio}</p>
              </p>
            </div>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
