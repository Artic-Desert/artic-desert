import React, { useEffect, useState, useRef } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { AiOutlineCode } from 'react-icons/ai';
import { BsDoorClosed } from 'react-icons/bs';
import './Header.css';
import { useUser } from '../../../hooks/use-user';
import { useRepo } from '../../../hooks/use-repo';
import { setBranch } from '../../../redux/branch/actions';
import { useDispatch } from 'react-redux';
import { useBranch } from '../../../hooks/use-branch';
import { GithubUser, RepoBranch } from '../../../types/Types';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import lottie from 'lottie-web';
import { ApiClientService } from '../../../services/ApiClientService';
import { useGhpToken } from '../../../hooks/use-ghpToken';
import { AuthService } from '../../../services/AuthService';

export const Header: React.FC = () => {
  const { user } = useUser();
  const { repo } = useRepo();
  const { branch } = useBranch();
  const { ghpToken } = useGhpToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    AuthService.resetUserSession();
    navigate('/');
  };

  console.log('<Header> current repo: ', repo);
  console.log('<Header> current branch: ', branch);

  const [repoInfo, setRepoInfo] = useState<{
    branches: RepoBranch[] | undefined;
    collaborators: GithubUser[] | undefined;
  }>({
    branches: undefined,
    collaborators: undefined,
  });

  const [currentBranch, setCurrentBranch] = useState('workspace');

  useEffect(() => {
    console.log('<Header> Repo before calling fetchInfoOfRepo : ', repo);
    fetchInfoOfRepo();
  }, []);

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

  const getBranches = async () => {
    try {
      return (
        repo.branches_url &&
        (await ApiClientService.getBranches(
          repo.branches_url.slice(0, repo.branches_url.length - 9),
          ghpToken,
        ))
      );
    } catch (error) {
      console.error('Error inside <Header> getBranches(): ', error);
    }
  };

  const getCollaborators = async () => {
    try {
      return await ApiClientService.getCollaboratorsOfRepo(repo, ghpToken);
    } catch (error) {
      console.error('Error inside <Header> getCollaborators(): ', error);
    }
  };

  const fetchInfoOfRepo = async () => {
    try {
      setLoading(true);
      const branches = await getBranches();
      const collaborators = branches && (await getCollaborators());
      setRepoInfo({ branches, collaborators });
      setLoading(false);
    } catch (error) {
      console.error('Error inside <Header> fetchInfoOfRepo(): ', error);
    }
  };

  const handleBranchChange = (
    e: SingleValue<{
      value: string;
      label: string;
    }>,
  ) => {
    // e.preventDefault();
    setCurrentBranch(e ? e.value : '');
  };

  const handleNavigation = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    dispatch(setBranch(currentBranch));
  }, [currentBranch]);

  const options = repoInfo.branches?.map((branch: RepoBranch) => {
    return { value: branch.name, label: branch.name };
  });

  const customStyles = {
    option: (
      //eslint-disable-next-line
      provided: any,
      { isFocused, isSelected }: { isFocused: boolean; isSelected: boolean },
    ) => ({
      ...provided,
      color: isSelected ? '#c8d1d9' : isFocused ? '#00111c' : '#c8d1d9',
      backgroundColor: isSelected
        ? '#00111c'
        : isFocused
        ? '#c8d1d9'
        : '#161b22',
    }),
    //eslint-disable-next-line
    menu: (provided: any) => ({
      ...provided,
      postion: 'fixed',
      zindex: '10',
      color: '#c8d1d9',
    }),
    //eslint-disable-next-line
    valueContainer: (provided: any) => ({
      ...provided,
      backgroundColor: '#161b22',
    }),
    //eslint-disable-next-line
    dropdownIndicator: (provided: any) => ({
      ...provided,
      backgroundColor: '#161b22',
    }),
    //eslint-disable-next-line
    control: (provided: any) => ({
      ...provided,
      backgroundColor: '#161b22',
    }),
    //eslint-disable-next-line
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: '#161b22',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      backgroundColor: '#161b22',
      color: '#c8d1d9',
    }),
  };
  return (
    <div className="kanban-header">
      {!loading ? (
        <>
          <div className="dropdown-select">
            {repoInfo.branches && (
              <Select
                className="select-branch"
                options={options}
                styles={customStyles}
                onChange={e => handleBranchChange(e)}></Select>
            )}
          </div>
          <div className="header-left">
            {repoInfo.branches && (
              <div className="num-branches">
                {repoInfo.branches.length} •{' '}
                <span>
                  {repoInfo.branches.length > 1 ? ' branches' : ' branch'}{' '}
                  <GoGitBranch />
                </span>
              </div>
            )}
            <div className="collaborators">
              {repoInfo.collaborators &&
                repoInfo.collaborators.map((collaborator: GithubUser) => {
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
          <p className="current-repo-prefix">Current Workspace</p>
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
