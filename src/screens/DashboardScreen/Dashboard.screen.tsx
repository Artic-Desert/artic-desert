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
import { UserInfo } from './UserInfoComponent/UserInfo.component';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../redux/repo/actions';
import { addRepo } from '../../redux/repos/actions';
import { setBranch } from '../../redux/branch/actions';
import { Collapasible } from '../../components/CollapsibleComponent/Collapsible.component';
import { NewRepo } from '../../components/NewRepoComponent/NewRepo.component';

export const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [gitHubUser, setGitHubUser] = React.useState<any>();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRepo({}));
    dispatch(setBranch('all-branches'));
  }, []);

  useEffect(() => {
    console.log('EL USER 8===D', user);

    fetch(`https://api.github.com/users/${user.login}`, {
      headers: {
        Authorization: `token ${process.env.REACT_APP_GHP_TOKEN}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log('EL LOG 8===D', data);
        setGitHubUser(data);
      });
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
          <UserInfo />
        </div>
        <div className="dashboard-middle">
          {/* <div className="header">
            <div className="title-logo-cont">
              <img className="header-logo" src={ades} alt="" />
              <h1 className="header-title">Dashboard</h1>
            </div>
            <div className="add-new">
              <h4>Add a new repository to your Dashboard</h4>
            </div>
          </div> */}
          <div className="hero">
            <div className="productivity">
              <Time />
              <RandomQuote />
              <Weather />
            </div>
          </div>
        </div>
        <div className="dashboard-right">
          <Collapasible open title="Add a new repository">
            <NewRepo />
          </Collapasible>
          <div className="dashboard-column">
            <RepoSideBar />
          </div>
        </div>
      </div>
    )
  );
};
