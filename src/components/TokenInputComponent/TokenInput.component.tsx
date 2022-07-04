import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/token/actions';
import './TokenInput.css';
export const TokenInput: React.FC = () => {
  const [ghpToken, setGhpToken] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setMessage('');
    event.preventDefault();
    if (ghpToken) {
      console.log('---------------------', ghpToken);
      dispatch(setToken(ghpToken));
    } else {
      setMessage('Please enter a valid GHP Token');
    }
  };
  return (
    <div className="token-input-container">
      <p className="info-text">
        You can generate a new token{' '}
        <a
          href="https://github.com/settings/tokens/new"
          target="_blank"
          rel="noreferrer">
          here
        </a>
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your token here..."
          value={ghpToken}
          onChange={event => setGhpToken(event.target.value)}
        />
        <input type="submit" value={'Enter'} />
      </form>
      {message && (
        <div>
          <p className="wrong-input-message">{message}</p>
        </div>
      )}
    </div>
  );
};
