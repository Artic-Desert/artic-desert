<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { GoGitBranch } from 'react-icons/go';
import { BsCircleFill } from 'react-icons/bs';
import './RepoItem.css';
import { useUser } from '../../hooks/use-user';
import moment from 'moment';

export const RepoItem: React.FC<any> = ({ repo, setRepos }) => {
  const [numOfBranches, setNumOfBranches] = useState(0);
  const { user } = useUser();

  const handleDelete = async () => {
    console.log(repo.full_name.toLowerCase());
    const body = JSON.stringify({
      repo: repo.full_name.toLowerCase(),
      action: 'remove',
    });
    const response = await fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${user.login}}`,
      {
        method: 'PATCH',
        body,
      },
    );
    const data = await response.json();

    if (!data.message) {
      setRepos((prevState: any) => {
        const newState = prevState.filter((el: any) => el.id !== repo.id);
        return newState;
      });
    }

    return data;
  };

  const fetchNumOfBranches = async () => {
    const response = await fetch(
      `https://api.github.com/repos/${repo.full_name}/branches`,
    );
    const branches = await response.json();
    setNumOfBranches(branches.length);
  };

  useEffect(() => {
    fetchNumOfBranches();
  }, []);

  return (
    <div className="repo-item-container">
      <div className="top-line">
        <h3 className="repo-name">{repo.name}</h3>
        <span className="privacy">{repo.private ? 'Private' : 'Public'}</span>
      </div>
      <div className="bot-line">
        <div className="lang-cont">
          <BsCircleFill className="lang-ball" />
          <span className="language">{repo.language}</span>
        </div>
        {numOfBranches && (
          <div className="branches">
            <GoGitBranch />
            <span className="num-branch">{numOfBranches}</span>
          </div>
        )}
        <span className="updated">{moment(repo.pushed_at).fromNow()}</span>
      </div>
    </div>
  );
};
=======
// import React from 'react';
// import { GoGitBranch } from 'react-icons/go';
// import { BsCircleFill } from 'react-icons/bs';
// import './RepoItem.css';

// export const RepoItem: React.FC = () => {
//   return (
//     <div className="repo-item-container">
//       <div className="top-line">
//         <h3 className="repo-name">Codeworks-Solo-Project</h3>
//         <span className="privacy">Public</span>
//       </div>
//       <div className="bot-line">
//         <div className="lang-cont">
//           <BsCircleFill className="lang-ball" />
//           <span className="language">TypeScript</span>
//         </div>
//         <div className="branches">
//           <GoGitBranch />
//           <span className="num-branch">33</span>
//         </div>
//         <span className="updated">Updated 9 days ago</span>
//       </div>
//     </div>
//   );
// };
>>>>>>> c762d376a2c9e3e5268aa25278fbcc9de6e12902
