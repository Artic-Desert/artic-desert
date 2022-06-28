import axios from 'axios'; //eslint-disable-line
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useActions } from '../../hooks/use-actions';
import { setUser } from '../../redux/user/actions';
import { AuthService } from '../../services/AuthService';
// require('dotenv').config('../../../.env'); //eslint-disable-line

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
    console.log(token, 'Token inside fetch');
    setLoading(true);
    const body = JSON.stringify({ code: token });
    fetch(
      'https://p96g6g201b.execute-api.us-east-1.amazonaws.com/dev/github-auth',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'access-control-allow-origin': '*',
        },
        body,
      },
    )
      .then(res => res.json())
      .then(data => {
        postUserToDynamo(data);
        setTrueToken(data.access_token);
        return fetchUserData(data.access_token);
      })
      .then(res => res.json())
      .then(data => {
        AuthService.setUserSession(data.login, trueToken);
        dispatch(setUser(data));
        navigate('/Dashboard');
      })
      .catch(err => console.log('Err : ', err));
  };

  const postUserToDynamo = async (body: any) => {
    fetch(
      'https://ugmp3ddru7.execute-api.us-east-1.amazonaws.com/dev/register-user',
      {
        method: 'POST',
        body: JSON.stringify(body),
      },
    )
      .then(res => console.log(res))
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
    console.log('hi');
    console.log(tempToken);
    tempToken && fetchRealToken(tempToken);
  }, []);

  useEffect(() => {
    console.log(trueToken, 'hello');
  }, [trueToken]);

  return (
    <div>
      <h1>Im validating your token, please wait...</h1>
      {loading ? <div>Loading...</div> : null}
    </div>
  );
};
