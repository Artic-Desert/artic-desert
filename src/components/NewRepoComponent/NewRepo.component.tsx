import React, { useState } from 'react';
import { useUser } from '../../hooks/use-user';
// import { AuthService } from '../../services/AuthService';
import './NewRepo.css';

export const NewRepo: React.FC<{
  setRepos: React.Dispatch<React.SetStateAction<any>>;
}> = ({ setRepos }) => {
  const [ownerName, setOwnerName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const BASE_URL = 'https://api.github.com';

  const repoFetchRequest = async (owner: string, repo: string) => {
    setIsVisible(false);
    // const token = AuthService.getToken();
    console.log(`${BASE_URL}/repos/${owner}/${repo}`);
    const repsonse = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
      // headers: {
      //   Authorization: `token ${token}`,
      // },
    });
    const data = await repsonse.json();
    if (data.id) {
      setRepos((prevState: any) => [...prevState, data]);
    } else {
      setIsVisible(true);
    }
    return data;
  };

  const { user } = useUser();

  const updateUserRepos = async (owner: string, repo: string) => {
    if (!owner || !repo) return;
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
    repoFetchRequest(ownerName, repoName);
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
      {isVisible && (
        <h4>
          Haven&apos;t found repo {repoName} by {ownerName}. Please try again.
        </h4>
      )}
    </div>
  );
};
