import React, { useEffect, useState, useRef } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { AiOutlineCode } from 'react-icons/ai';
import { BsDoorClosed } from 'react-icons/bs';
import './Header.css';
import { useUser } from '../../../hooks/use-user';
import { useRepo } from '../../../hooks/use-repo';
import { setBranch } from '../../../redux/branch/actions';
import { useDispatch } from 'react-redux';
import { GithubUser, RepoBranch } from '../../../types/Types';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import lottie from 'lottie-web';
import { ApiClientService } from '../../../services/ApiClientService';
import { useGhpToken } from '../../../hooks/use-ghpToken';
import { AuthService } from '../../../services/AuthService';
import { setBranches } from '../../../redux/branches/actions';
import { useBranches } from '../../../hooks/use-branches';
import { customStyles } from './Header.variables';

export const Header: React.FC = () => {
  const { user } = useUser();
  const { repo } = useRepo();
  const { branches } = useBranches();
  const { ghpToken } = useGhpToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    console.log('<Header> Repo before calling fetchInfoOfRepo : ', repo);
    fetchInfoOfRepo();
  }, []);

  useEffect(() => {
    branches && collaborators && setLoading(false);
  }, [loading === true]);

  const container: any = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('../../../assets/lottie/loading2.json'),
    });
  }, []);

  const handleLogout = () => {
    AuthService.resetUserSession();
    navigate('/');
  };

  const handleBranchChange = (
    e: SingleValue<{
      value: string;
      label: string;
    }>,
  ) => {
    console.log('Branch change event fired. Current branch: ', e?.value);
    dispatch(setBranch(e?.value || default_branch));
  };

  const handleNavigation = () => {
    navigate('/dashboard');
  };

  const getBranches = async () => {
    try {
      const repo_url_clean =
        repo && repo.branches_url.slice(0, repo.branches_url.length - 9);
      return (
        repo.branches_url &&
        ApiClientService.getBranches(repo_url_clean, ghpToken).then(data => {
          const newBranches = data.map(
            (branchObj: RepoBranch) => branchObj.name,
          );
          dispatch(setBranches(newBranches));
        })
      );
    } catch (error) {
      console.error('Error inside <Header> getBranches(): ', error);
    }
  };

  const getCollaborators = async () => {
    try {
      ApiClientService.getCollaboratorsOfRepo(repo, ghpToken).then(data => {
        setCollaborators(data);
      });
    } catch (error) {
      console.error('Error inside <Header> getCollaborators(): ', error);
    }
  };

  const fetchInfoOfRepo = async () => {
    try {
      setLoading(true);
      getBranches();
      getCollaborators();
    } catch (error) {
      console.error('Error inside <Header> fetchInfoOfRepo(): ', error);
    }
  };

  const default_branch = {
    label: repo.default_branch,
    value: repo.default_branch,
  };

  const options =
    branches &&
    branches.map((branch: string) => {
      return { value: branch, label: branch };
    });

  return (
    <div className="kanban-header">
      {!loading ? (
        <>
          <div className="dropdown-select">
            {branches && (
              <Select
                className="select-branch"
                options={options}
                styles={customStyles}
                defaultValue={default_branch}
                onChange={e => handleBranchChange(e)}></Select>
            )}
          </div>
          <div className="header-left">
            {branches && (
              <div className="num-branches">
                {branches.length} •{' '}
                <span>
                  {branches.length > 1 ? ' branches' : ' branch'}{' '}
                  <GoGitBranch />
                </span>
              </div>
            )}
            <div className="collaborators">
              {collaborators &&
                collaborators.map((collaborator: GithubUser) => {
                  return (
                    <a
                      title={`${collaborator.login}'s GitHub`}
                      key={`${collaborator.id}_key`}
                      href={collaborator.html_url}
                      target="_blank"
                      rel="noreferrer">
                      <img
                        key={collaborator.id}
                        src={collaborator.avatar_url}
                        alt=""
                      />
                    </a>
                  );
                })}
            </div>
          </div>
        </>
      ) : (
        <div className="header-lottie-container">
          <h3>Loading Repo Branches</h3>
          <div className="header-lottie-element" ref={container}></div>
        </div>
      )}
      {repo && (
        <div className="header-center">
          {/* <p className="current-repo-prefix">Current Workspace</p> */}
          <span className="repo-title-icon">
            <a
              key={repo.name}
              href={repo.html_url}
              target="blank"
              rel="noreferrer">
              {repo.name}
            </a>
            <AiOutlineCode color="#c8d1d9" size={30} />
          </span>
        </div>
      )}
      <div className="header-right">
        <div className="user-info">
          <div className="hello-logout-cont">
            <span>Hello {user.name.split(' ')[0]}!</span>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
          <a
            title="GitHub Profile"
            key={user.id}
            href={user.html_url}
            target="_blank"
            rel="noreferrer">
            <img src={user.avatar_url} alt="" />
          </a>
        </div>
        <div
          title="Dashboard"
          className="navigate-dashboard"
          onClick={handleNavigation}>
          <p onClick={handleNavigation}>Back to Dashboard</p>
          <BsDoorClosed size={30} />
        </div>
      </div>
    </div>
  );
};
