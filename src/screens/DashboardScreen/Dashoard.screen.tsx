import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { RepoSideBar } from '../../components/RepoSideBarComponent/RepoSideBar.component';
import { useUser } from '../../hooks/use-user';
import { AuthService } from '../../services/AuthService';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  // const { user } = useUser();
  const user: any = sessionStorage.getItem('user');
  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.resetUserSession();
    navigate('/');
  };

  console.log('session user: ', user);

  return (
    user && (
      <div className="dashboardWrapper">
        <div className="userInfo">
          <div className="avatar">
            <img src={user.avatar_url}></img>
          </div>
          <div className="name">{user.name}</div>
          <div className="githubInfo">
            <div className="githubName">{user.login}</div>
            <a
              href={user.html_url}
              className="githubLink"
              target="_blank"
              rel="noreferrer">
              <GoMarkGithub />
            </a>
          </div>
          <div>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
        <div className="repoSideBar">
          <RepoSideBar />
        </div>
      </div>
    )
  );
};
