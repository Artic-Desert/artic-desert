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
      <button className="loginButton" onClick={handleLogin}>
        Login with GitHub
      </button>
    </div>
  );
};
