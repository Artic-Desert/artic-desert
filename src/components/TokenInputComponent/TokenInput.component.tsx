import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/token/actions';
import { FiLink } from 'react-icons/fi';
import './TokenInput.css';
export const TokenInput: React.FC = () => {
  const [ghpToken, setGhpToken] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setMessage('');
    event.preventDefault();
    if (ghpToken) {
      dispatch(setToken(ghpToken));
    } else {
      setMessage('Please enter a valid GHP Token');
    }
  };
  return (
    <div className="token-input-container">
      <div className="token-container">
        <p className="info-text">
          Enter your GitHub Personal Access Token, or generate a new token{' '}
          <span className="token-a-cont">
            <a
              href="https://github.com/settings/tokens/new"
              target="_blank"
              rel="noreferrer">
              here • <FiLink />
            </a>
          </span>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="token-input-field"
            type="text"
            placeholder="Enter your token"
            value={ghpToken}
            onChange={event => setGhpToken(event.target.value)}
          />
          <div className="token-submit-cont">
            <input className="token-submit" type="submit" value={'Submit'} />
          </div>
        </form>
        {message && (
          <div>
            <p className="wrong-input-message">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
