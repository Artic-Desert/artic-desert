import React from 'react';
import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { useUser } from '../../hooks/use-user';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { user } = useUser();

  useEffect(() => console.log(user, 'user in dashboards'), [user]);

  return (
    user && (
      <div className="wrapper">
        <div className="avatar">
          <img src={user.avatar_url}></img>
        </div>
        <div className="name">{user.name}</div>
        <div className="githubInfo">
          <div className="githubName">{user.login}</div>
          <a
            href={user.html_url}
            className="githubLink"
            target="_blank"
            rel="noreferrer">
            <GoMarkGithub />
          </a>
        </div>
      </div>
    )
  );
};
