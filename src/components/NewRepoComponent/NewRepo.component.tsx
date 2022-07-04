import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGhpToken } from '../../hooks/use-ghpToken';
import { useRepos } from '../../hooks/use-repos';
import { useUser } from '../../hooks/use-user';
import { addRepo } from '../../redux/repos/actions';
import { ApiClientService } from '../../services/ApiClientService';
// import { AuthService } from '../../services/AuthService';
import './NewRepo.css';

export const NewRepo: React.FC = () => {
  const [ownerName, setOwnerName] = useState('');
  const [repoName, setRepoName] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [message, setMessage] = useState('');

  const { repos } = useRepos();
  const { user } = useUser();
  const { ghpToken } = useGhpToken();
  const dispatch = useDispatch();

  const handleRepoAlreadyExists = () => {
    setMessage(
      'The Repository you are trying to add already exists in your workspace!',
    );
  };

  const handleRepoNotFound = (repo: string, owner: string) => {
    setMessage(
      `Error 🚫 \nWe weren't able to find a repository called: ${repo} with author: ${owner}. Check your input and please try again.`,
    );
  };

  const repoFetchRequest = async (owner: string, repo: string) => {
    try {
      setMessage('');

      const repoAlreadyExists =
        repos &&
        repos.find(
          (el: { full_name: string }) =>
            el.full_name.toLowerCase() === `${owner}/${repo}`.toLowerCase(),
        );

      return (
        repos &&
        ApiClientService.getGithubRepo(owner, repo, ghpToken).then(data => {
          if (repoAlreadyExists) {
            handleRepoAlreadyExists();
            return;
          } else {
            if (data.id) {
              dispatch(addRepo(data));
            } else {
              handleRepoNotFound(repo, owner);
              return;
            }
            console.log('<NewRepo> repo fullname : ', `${owner}/${repo}`);

            setMessage('Repository added successfully!');
            console.log(message);

            return data;
          }
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserRepos = async (owner: string, repo: string) => {
    if (!owner || !repo) return;

    const repoFromGithub = await repoFetchRequest(owner, repo);

    if (!repoFromGithub) return;

    const body = JSON.stringify({
      repo: `${owner}/${repo}`,
      action: 'add',
    });

    return body && ApiClientService.updateDynamoUser(user.login, body);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
    if (ownerName && repoName) {
      updateUserRepos(ownerName, repoName);
    } else if (repoUrl) {
      const repoInfo = repoUrl.split('/');
      const owner = repoInfo[3];
      const name = repoInfo[4];
      updateUserRepos(owner, name);
    } else {
      setMessage("Please, enter either the repo's name and owner or a url!");
    }
    setRepoUrl('');
    setOwnerName('');
    setRepoName('');
  };

  const byeError = () => {
    setMessage('');
  };

  return (
    <div className="formWrapper">
      <form onSubmit={event => handleSubmit(event)} className="newRepoForm">
        <input
          type="text"
          value={ownerName}
          placeholder="Github username"
          onChange={event => setOwnerName(event.target.value)}
        />
        <input
          type="text"
          value={repoName}
          placeholder="Repository name"
          onChange={event => setRepoName(event.target.value)}
        />
        <span className="or">or ...</span>
        <input
          type="text"
          placeholder="Paste Github URL"
          value={repoUrl}
          onChange={event => setRepoUrl(event.target.value)}
        />
        <button className="dashboard-submit-button" type="submit">
          Add repo to dashboard
        </button>
      </form>
      {message && (
        <h4 className="error-message" onClick={byeError}>
          {message}
          <button>close</button>
        </h4>
      )}
    </div>
  );
};
