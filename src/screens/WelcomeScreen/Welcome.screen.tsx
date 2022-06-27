import axios from 'axios';
import React from 'react';
import './Welcome.css';

export const Welcome: React.FC = () => {
  const client_id = '71c6863d3d338f86fe07';

  const handleLogin = () => {
    axios.get(
      `https://github.com/login/oauth/authorize?client_id=${client_id}`,
    );
  };

  return (
    <div className="wrapper">
      <a
        className="loginButton"
        href={`https://github.com/login/oauth/authorize?client_id=${client_id}`}>
        Login with GitHub
      </a>
    </div>
  );
};
