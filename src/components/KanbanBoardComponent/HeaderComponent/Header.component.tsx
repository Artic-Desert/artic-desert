import React, { useEffect, useState } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { MdOutlineDashboard } from 'react-icons/md';
import './Header.css';
import { useUser } from '../../../hooks/use-user';
import { useRepo } from '../../../hooks/use-repo';
import { setBranch } from '../../../redux/branch/actions';
import { useDispatch } from 'react-redux';
import { useBranch } from '../../../hooks/use-branch';
import { GithubUser, RepoBranch } from '../../../types/Types';
import Select, { SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { ApiClientService } from '../../../services/ApiClientService';
import { useGhpToken } from '../../../hooks/use-ghpToken';

export const Header: React.FC = () => {
  const { user } = useUser();
  const { repo } = useRepo();
  const { branch } = useBranch();
  const { ghpToken } = useGhpToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log('<Header> current repo: ', repo);
  console.log('<Header> current branch: ', branch);

  const [repoInfo, setRepoInfo] = useState<{
    branches: RepoBranch[] | undefined;
    collaborators: GithubUser[] | undefined;
  }>({
    branches: undefined,
    collaborators: undefined,
  });

  const [currentBranch, setCurrentBranch] = useState('repo-board');

  useEffect(() => {
    console.log('<Header> Repo before calling fetchInfoOfRepo : ', repo);
    fetchInfoOfRepo();
  }, []);

  const getBranches = async () => {
    try {
      return (
        repo.branches_url &&
        (await ApiClientService.getBranches(
          repo.branches_url.slice(0, repo.branches_url.length - 9),
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
      const branches = await getBranches();
      const collaborators = branches && (await getCollaborators());
      setRepoInfo({ branches, collaborators });
    } catch (error) {
      console.error('Error inside <Header> fetchInfoOfRepo(): ', error);
    }
  };

  useEffect(() => {
    console.log('<Header> Repo before calling fetchInfoOfRepo : ', repo);
    fetchInfoOfRepo();
  }, []);

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
      color: isSelected ? 'white' : isFocused ? '#00111c' : '##f3f0f0',
      backgroundColor: isSelected
        ? '#00111c'
        : isFocused
        ? '#57a6ff'
        : '#f3f0f0',
    }),
    //eslint-disable-next-line
    menu: (provided: any) => ({
      ...provided,
      postion: 'fixed',
      zindex: '10',
    }),
  };
  return (
    <div className="kanban-header">
      <div className="select">
        {repoInfo.branches && (
          <Select
            options={options}
            styles={customStyles}
            onChange={e => handleBranchChange(e)}></Select>
        )}
      </div>
      <div className="left">
        {repoInfo.branches && (
          <div className="num-branches">
            <GoGitBranch />
            <span>
              {repoInfo.branches.length}
              {repoInfo.branches.length > 1 ? ' branches' : ' branch'}
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
      {repo && (
        <div className="current-repo">
          <span className="current-repo-prefix">
            <GoGitBranch /> current repo:
          </span>
          <a
            title="GitHub Repo"
            key={repo.name}
            href={repo.html_url}
            target="blank"
            rel="noreferrer">
            {repo.name}
          </a>
        </div>
      )}
      <div className="right">
        <div className="user-info">
          <span>Hello {user.name.split(' ')[0]}!</span>
          <a
            title="GitHub Profile"
            key={user.id}
            href={user.html_url}
            target="_blank"
            rel="noreferrer">
            <img src={user.avatar_url} alt="" />
          </a>
          <div title="Dashboard" className="navigate-dashboard">
            <p onClick={handleNavigation}>
              {' '}
              <MdOutlineDashboard />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
