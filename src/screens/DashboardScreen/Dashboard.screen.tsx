import React from 'react';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { GoMarkGithub } from 'react-icons/go';
// import { useNavigate } from 'react-router-dom';
// import { RepoItem } from '../../components/RepoItemComponent/RepoItem.component';
import { RepoSideBar } from '../../components/RepoSideBarComponent/RepoSideBar.component';
import { Time } from '../../components/TimeComponent/Time.component';
import { RandomQuote } from '../../components/RandomQuoteComponent/RandomQuote.component';
import { Weather } from '../../components/WeatherComponent/Weather.component';
import { useUser } from '../../hooks/use-user';
// import { AuthService } from '../../services/AuthService';
// import ades from '../../assets/ades.svg';
import './Dashboard.css';
import { UserInfo } from './UserInfoComponent/UserInfo.component';
import { useDispatch } from 'react-redux';
import { setRepo } from '../../redux/repo/actions';
// import { addRepo } from '../../redux/repos/actions';
import { setBranch } from '../../redux/branch/actions';
import { Collapasible } from '../../components/CollapsibleComponent/Collapsible.component';
import { NewRepo } from '../../components/NewRepoComponent/NewRepo.component';
import { useGhpToken } from '../../hooks/use-ghpToken';
import { TokenInput } from '../../components/TokenInputComponent/TokenInput.component';

export const Dashboard: React.FC = () => {
  const { user } = useUser();
  // const [gitHubUser, setGitHubUser] = React.useState<any>();
  const { ghpToken } = useGhpToken();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('ghpToken : ', ghpToken);
    dispatch(setRepo({}));
    dispatch(setBranch('all-branches'));
  }, []);

  return (
    user && (
      <div className="dashboard-wrapper">
        <div className="dashboard-left">
          <UserInfo />
        </div>
        <div className="dashboard-middle">
          <div className="hero">
            <div className="productivity">
              <Time />
              <RandomQuote />
              <Weather />
            </div>
          </div>
        </div>
        {!ghpToken ? (
          <TokenInput />
        ) : (
          <div className="dashboard-right">
            <Collapasible open title="Add a new repository">
              <NewRepo />
            </Collapasible>
            <div className="dashboard-column">
              <RepoSideBar />
            </div>
          </div>
        )}
      </div>
    )
  );
};
