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
import Select from 'react-select';
import { Z_FIXED } from 'zlib';
import { isWhiteSpaceLike } from 'typescript';

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

  const [currentBranch, setCurrentBranch] = useState('repo-board');

  useEffect(() => {
    console.log('<Header> Repo before calling fetchInfoOfRepo : ', repo);
    fetchInfoOfRepo();
  }, []);

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

  const handleBranchChange = (e: any) => {
    // e.preventDefault();
    setCurrentBranch(e.value);
  };

  useEffect(() => {
    dispatch(setBranch(currentBranch));
  }, [currentBranch]);

  const options = repoInfo.branches?.map((branch: RepoBranch) => {
    return { value: branch.name, label: branch.name };
  });

  const customStyles = {
    option: (provided: any, { isFocused, isSelected }: any) => ({
      ...provided,
      color: isSelected ? 'white' : isFocused ? '#00111c' : '##f3f0f0',
      backgroundColor: isSelected
        ? '#00111c'
        : isFocused
        ? '#57a6ff'
        : '#f3f0f0',
    }),
    menu: (provided: any, state: any) => ({
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
                  title="GitHub Profile"
                  key={collaborator.id}
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
          <img src={user.avatar_url} alt="" />
        </div>
      </div>
    </div>
  );
};
