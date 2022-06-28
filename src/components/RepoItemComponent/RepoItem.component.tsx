import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import { TiDeleteOutline } from 'react-icons/ti';
import { useUser } from '../../hooks/use-user';
import './RepoItem.css';

export const RepoItem: React.FC<any> = ({ repo, setRepos }) => {
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

  return (
    <div key={repo.id} className="repoItem">
      <button className="deleteRepo" onClick={handleDelete}>
        <TiDeleteOutline />
      </button>
      <div className="title">
        {repo.name} by {repo.owner.login}
        <a
          href={repo.html_url}
          className="githubRepoLink"
          target="_blank"
          rel="noreferrer">
          <GoMarkGithub size={25} />
        </a>
      </div>
      {repo.parent && <div>Forked from: {repo.parent.full_name}</div>}
    </div>
  );
};
