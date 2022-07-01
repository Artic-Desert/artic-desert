import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks/use-user';
import { NewRepo } from '../NewRepoComponent/NewRepo.component';
import { RepoItem } from '../RepoItemComponent/RepoItem.component';
import { DynamoUser, GithubRepo } from '../../types/Types';
import './RepoSideBar.css';
import { Collapasible } from '../CollapsibleComponent/Collapsible.component';

export const RepoSideBar: React.FC = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]); //eslint-disable-line
  const [loading, setLoading] = useState(false); //eslint-disable-line

  const { user } = useUser();

  const fetchUser = async (): Promise<DynamoUser | undefined> => {
    try {
      const response = await fetch(
        `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${user.login}}`,
      );
      return await response.json();
    } catch (error) {
      console.log('Error in repo side bar fetching user from dynamo: ', error);
    }
    return;
  };

  const fetchUserRepos = async () => {
    setLoading(true);

    const user = await fetchUser();
    console.log('user before', user);

    user &&
      user.repos.map(async repo => {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: {
              Authorization: `token ${process.env.REACT_APP_GHP_TOKEN}`,
            },
          });
          const data = await response.json();
          console.log('repo data: ', data);
          setRepos((prevState: GithubRepo[]) => [...prevState, data]); // Type of prevstate is github repo response
        } catch (error) {
          console.log(
            'Error in repo side bar fetching repos from github: ',
            error,
          );
        }
      });

    setLoading(false);
  };

  useEffect(() => {
    fetchUserRepos();
  }, []);

  return (
    <div className="repoSideBarWrapper">
      <Collapasible open title="Add a new repository">
        <NewRepo setRepos={setRepos} repos={repos} />
      </Collapasible>
      {repos &&
        repos.map((repo: GithubRepo) => {
          return <RepoItem repo={repo} key={repo.id} setRepos={setRepos} />;
        })}
    </div>
  );
};
