import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks/use-user';
import { NewRepo } from '../NewRepoComponent/NewRepo.component';
import { RepoItem } from '../RepoItemComponent/RepoItem.component';
import './RepoSideBar.css';

export const RepoSideBar: React.FC = () => {
  const [repos, setRepos] = useState<any>([]); //eslint-disable-line

  const { user } = useUser();

  const fetchUserRepos = async () => {
    const response = await fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${user.login}}`,
    );
    const data = await response.json();
    for (const repo of data.repos) {
      const response = await fetch(`https://api.github.com/repos/${repo}`);
      const data = await response.json();
      setRepos((prevState: any[]) => {
        return [...prevState, data];
      });
    }
    return data;
  };

  useEffect(() => {
    fetchUserRepos();
  }, []);

  return (
    <div className="repoSideBarWrapper">
      <NewRepo setRepos={setRepos} repos={repos} />
      {repos &&
        repos.map((repo: any) => {
          return <RepoItem repo={repo} key={repo.id} setRepos={setRepos} />;
        })}
    </div>
  );
};
