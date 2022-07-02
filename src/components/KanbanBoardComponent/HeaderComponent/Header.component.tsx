import React, { useEffect, useState } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import './Header.css';
import { useUser } from '../../../hooks/use-user';
import { useRepo } from '../../../hooks/use-repo';
import { AuthService } from '../../../services/AuthService';
import { setBranch } from '../../../redux/branch/actions';
import { useDispatch } from 'react-redux';
import { useBranch } from '../../../hooks/use-branch';
import { GithubUser, RepoBranch } from '../../../types/Types';

export const Header: React.FC = () => {
  const { user } = useUser();
  const { repo } = useRepo();
  const { branch } = useBranch();
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

  const [currentBranch, setCurrentBranch] = useState(
    'sebastianfdz:by:nanji:by:main',
  );

  const getBranches = async () => {
    try {
      const branchesResponse = await fetch(
        repo.branches_url &&
          repo.branches_url.slice(0, repo.branches_url.length - 9),
        {
          headers: {
            Authorization: `token ${process.env.REACT_APP_GHP_TOKEN}`,
          },
        },
      );
      const branch = await branchesResponse.json();
      console.log('<Header> response from getBranches: ', branch);
      return branch;
    } catch (error) {
      console.error('Error inside <Header> getBranches(): ', error);
    }
  };

  const getCollaborators = async () => {
    const body = {
      repo: repo.name,
      owner: repo.owner.login,
      token: process.env.REACT_APP_GHP_TOKEN,
    };
    try {
      const collaboratorsResponse = await fetch(
        'https://arctic-desert.herokuapp.com/filter',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      const collaborators = await collaboratorsResponse.json();
      console.log('<Header> response from getCollaborators: ', collaborators);
      return collaborators;
    } catch (error) {
      console.error('Error inside <Header> getCollaborators(): ', error);
    }
  };

  const fetchInfoOfRepo = async () => {
    try {
      const branches = await getBranches();
      const collaborators = await getCollaborators();
      setRepoInfo({ branches, collaborators });
    } catch (error) {
      console.error('Error inside <Header> fetchInfoOfRepo(): ', error);
    }
  };

  useEffect(() => {
    console.log('<Header> Repo before calling fetchInfoOfRepo : ', repo);
    fetchInfoOfRepo();
  }, []);

  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCurrentBranch(e.target.selectedOptions[0].value);
  };

  useEffect(() => {
    dispatch(setBranch(currentBranch));
  }, [currentBranch]);

  return (
    <div className="kanban-header">
      <div className="left">
        {repoInfo.branches && (
          <select
            className="branch-selector"
            onChange={e => handleBranchChange(e)}>
            <option key={'repo-board'} value="repo-board">
              branch
            </option>
            {repoInfo.branches.map((branch: RepoBranch) => {
              return (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              );
            })}
          </select>
        )}
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
                <img
                  key={collaborator.id}
                  src={collaborator.avatar_url}
                  alt=""
                />
              );
            })}
        </div>
      </div>
      <div className="right">
        <div className="user-info">
          <span>Hello {user.name.split(' ')[0]}!</span>
          <img src={user.avatar_url} alt="" />
        </div>
      </div>
    </div>
  );
};
