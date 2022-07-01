import React from 'react';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { RepoItem } from '../../components/RepoItemComponent/RepoItem.component';
import { RepoSideBar } from '../../components/RepoSideBarComponent/RepoSideBar.component';
import { Time } from '../../components/TimeComponent/Time.component';
import { RandomQuote } from '../../components/RandomQuoteComponent/RandomQuote.component';
import { Weather } from '../../components/WeatherComponent/Weather.component';
import { useUser } from '../../hooks/use-user';
import { AuthService } from '../../services/AuthService';
import ades from '../../assets/ades.svg';
import './Dashboard.css';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../redux/repo/actions';
import { setBranch } from '../../redux/branch/actions';

export const Dashboard: React.FC = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRepo({}));
    dispatch(setBranch('all-branches'));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthService.resetUserSession();
    navigate('/');
  };

  return (
    user && (
      <div className="dashboard-wrapper">
        <div className="dashboard-left">
          <div className="header">
            <div className="dashboard-user-info">
              <div className="name-pic">
                <img src={user.avatar_url} alt="user profile pics" />
                <div className="name">{user.name}</div>
              </div>
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
            </div>
            <div className="title-logo-cont">
              <img className="header-logo" src={ades} alt="" />
              <h1 className="header-title">Dashboard</h1>
            </div>
            <div className="add-new">
              <h4>Add a new repository to your Dashboard</h4>
            </div>
          </div>
          <div className="hero">
            <div className="productivity">
              <Time />
              <RandomQuote />
              <Weather />
            </div>
          </div>
        </div>
        <div className="dashboard-right">
          <div className="dashboard-column">
            <RepoSideBar />
          </div>
        </div>
      </div>
    )
  );
};
