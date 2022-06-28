import React, { useState } from 'react';
import { useUser } from '../../hooks/use-user';
// import { AuthService } from '../../services/AuthService';
import './NewRepo.css';

export const NewRepo: React.FC<{
  setRepos: React.Dispatch<React.SetStateAction<any[]>>;
  repos: any[];
}> = ({ setRepos, repos }) => {
  const [ownerName, setOwnerName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [message, setMessage] = useState('');

  const BASE_URL = 'https://api.github.com';

  const repoFetchRequest = async (owner: string, repo: string) => {
    setMessage('');
    // const token = AuthService.getToken();
    console.log(`${BASE_URL}/repos/${owner}/${repo}`);
    const repsonse = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
      // headers: {
      //   Authorization: `token ${token}`,
      // },
    });
    const data = await repsonse.json();
    if (
      repos.find(
        (el: any) =>
          el.full_name.toLowerCase() === `${owner}/${repo}`.toLowerCase(),
      )
    ) {
      setMessage('Repo already added');
      return;
    } else {
      if (data.id) {
        setRepos((prevState: any[]) => [...prevState, data]);
      } else {
        setMessage(`Haven't found repo ${repo} by ${owner}. Please try again.`);
        return;
      }
    }
    return data;
  };

  const { user } = useUser();

  const updateUserRepos = async (owner: string, repo: string) => {
    if (!owner || !repo) return;

    const repoFromGH = await repoFetchRequest(owner, repo);

    console.log(repoFromGH);

    if (!repoFromGH) return;

    const body = JSON.stringify({
      repo: `${owner}/${repo}`,
      action: 'add',
    });
    const response = await fetch(
      `https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/users/{${user.login}}`,
      {
        method: 'PATCH',
        body,
      },
    );
    const data = await response.json();
    return data;
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // repoFetchRequest(ownerName, repoName);
    updateUserRepos(ownerName, repoName);
  };

  return (
    <div className="formWrapper">
      <form onSubmit={event => handleSubmit(event)} className="newRepoForm">
        <input
          type="text"
          value={ownerName}
          placeholder="Owner of the repo..."
          onChange={event => setOwnerName(event.target.value)}
        />
        <input
          type="text"
          value={repoName}
          placeholder="Name of the repo..."
          onChange={event => setRepoName(event.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
      {message && <h4>{message}</h4>}
    </div>
  );
};
