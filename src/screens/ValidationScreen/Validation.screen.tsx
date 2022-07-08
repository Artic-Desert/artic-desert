import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { GoMarkGithub } from 'react-icons/go';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { setUser } from '../../redux/user/actions';
import { AuthService } from '../../services/AuthService';
import dots from '../../assets/loaddots.svg';

import './Validation.css';

export const Validation: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line
  //eslint-disable-next-line
  const [tempToken, setTempToken] = useState<string | null>(
    searchParams.get('code'),
  );
  const [trueToken, setTrueToken] = useState<string | undefined>(); //eslint-disable-line
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchRealToken = async (token: string) => {
    setLoading(true);
    const body = JSON.stringify({ code: token });
    fetch(
      'https://p96g6g201b.execute-api.us-east-1.amazonaws.com/dev/github-auth',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body,
      },
    )
      .then(res => res.json())
      .then(data => {
        postUserToDynamo(data);
        console.log(data.access_token, 'access token');
        setTrueToken(data.access_token);
        AuthService.setToken(data.access_token);
        return fetchUserData(data.access_token);
      })
      .then(res => res.json())
      .then(data => {
        console.log('true token : ', AuthService.getToken());
        AuthService.setUser(data);
        dispatch(setUser(data));
        navigate('/Dashboard');
      })
      .catch(err => console.log('Err : ', err));
  };

  const postUserToDynamo = async (body: {
    acces_token: string;
    token_type: string;
    scope: string;
  }) => {
    fetch(
      'https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/register-user',
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    )
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  const fetchUserData = async (token: string) => {
    return await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${token}`,
      },
    });
  };

  useEffect(() => {
    tempToken && fetchRealToken(tempToken);
  }, []);

  return (
    <div className="validation-wrapper">
      <div className="validation-main-container">
        <h1 className="validation-screen-h1">
          Connecting to Github{' '}
          <span className="git-spin">
            <GoMarkGithub className="git-spin" size={60} />
          </span>
        </h1>
        <img className="load-dots" src={dots} alt="" />
        {loading ? <div className="validation-loading">Please wait</div> : null}
      </div>
    </div>
  );
};
