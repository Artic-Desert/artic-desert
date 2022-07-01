import React, { useEffect, useState } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { AiFillCaretDown } from 'react-icons/ai';
import './Header.css';
import { useUser } from '../../../hooks/use-user';
import { useRepo } from '../../../hooks/use-repo';
import { AuthService } from '../../../services/AuthService';
import { setBranch } from '../../../redux/branch/actions';

export const Header: React.FC = () => {
  const { user } = useUser();
  const { repo } = useRepo();

  const [repoInfo, setRepoInfo] = useState<{
    branches: any;
    collaborators: any;
  }>({
    branches: undefined,
    collaborators: undefined,
  });

  const [currentBranch, setCurrentBranch] = useState(
    '{sebastianfdz:by:nanji:by:main}',
  );

  const fetchInfoOfRepo = async () => {
    console.log('REPO IN FETCH : ', repo);
    const branchesResponse = await fetch(
      repo.branches_url.slice(0, repo.branches_url.length - 9),
    );
    const branches = await branchesResponse.json();

    const body = {
      repo: repo.name,
      owner: repo.owner.login,
      token: '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',
    };

    console.log('BODY : ---------------->', body);

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

    setRepoInfo({ branches, collaborators });
  };

  useEffect(() => {
    console.log('REPO OUTSIDE OF FETCH : ', repo);
    fetchInfoOfRepo();
  }, []);

  const handleBranchChange = (e: any) => {
    e.preventDefault();
    setCurrentBranch(e.target.selectedOptions);
  };

  // useEffect(() => {
  //   console.log('BRANACHES AND COLLABORATORS : ', repoInfo);
  // }, [repoInfo]);

  return (
    <div className="kanban-header">
      <div className="left">
        {/* <div className="branch-name">
          <GoGitBranch />
          <span>main</span>
          <AiFillCaretDown fontSize="14px" />
        </div> */}
        {repoInfo.branches && (
          <select
            onChange={e => {
              console.log('BRANCHHH', e.target.selectedOptions);
            }}>
            {repoInfo.branches.map((branch: any) => {
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
            repoInfo.collaborators.map((collaborator: any) => {
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
