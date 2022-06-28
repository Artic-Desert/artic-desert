import React from 'react';
import { GoMarkGithub } from 'react-icons/go';
import './RepoItem.css';

export const RepoItem: React.FC<any> = ({ repo }) => {
  return (
    <div key={repo.id} className="repoItem">
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
