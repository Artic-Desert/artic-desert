import React, { useEffect, useState } from 'react';
import { useUser } from '../../hooks/use-user';
import { RepoItem } from '../RepoItemComponent/RepoItem.component';
import { DynamoUser, GithubRepo } from '../../types/Types';
import './RepoSideBar.css';
import { useDispatch } from 'react-redux';
import { setRepos } from '../../redux/repos/actions';
import { useRepos } from '../../hooks/use-repos';
import { useGhpToken } from '../../hooks/use-ghpToken';
import { ApiClientService } from '../../services/ApiClientService';

export const RepoSideBar: React.FC = () => {
  const [loading, setLoading] = useState(false); //eslint-disable-line
  const dispatch = useDispatch();

  const { repos } = useRepos();
  const { user } = useUser();
  const { ghpToken } = useGhpToken();

  const fetchUser = async (): Promise<DynamoUser | undefined> => {
    try {
      return ApiClientService.getUser(user.login);
    } catch (error) {
      console.log('Error in repo side bar fetching user from dynamo: ', error);
    }
    return;
  };

  const fetchUserRepos = async () => {
    setLoading(true);

    const user = await fetchUser();

    user &&
      Promise.all(
        user.repos.map(async repo => {
          try {
            const owner = repo.split('/')[0];
            const repo_name = repo.split('/')[1];
            return await ApiClientService.getGithubRepo(
              owner,
              repo_name,
              ghpToken,
            );
          } catch (error) {
            console.log(
              'Error in repo side bar fetching repos from github: ',
              error,
            );
          }
        }),
      ).then(result => dispatch(setRepos(result)));

    setLoading(false);
  };

  useEffect(() => {
    fetchUserRepos();
  }, []);

  return (
    <div className="repoSideBarWrapper">
      {repos &&
        repos.map((repo: GithubRepo) => {
          return <RepoItem repo={repo} key={repo.id} />;
        })}
    </div>
  );
};
