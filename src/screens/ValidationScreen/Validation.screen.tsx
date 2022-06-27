import axios from 'axios'; //eslint-disable-line
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// require('dotenv').config('../../../.env'); //eslint-disable-line

export const Validation: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line
  const [tempToken, setTempToken] = useState<string | null>('');
  const [trueToken, setTrueToken] = useState<string | undefined>(); //eslint-disable-line
  const [loading, setLoading] = useState(false);

  const fetchRealToken = async (token: string) => {
    console.log(token, 'Token inside fetch');
    setLoading(true);
    const body = JSON.stringify({ code: token });
    fetch(
      'https://p96g6g201b.execute-api.us-east-1.amazonaws.com/dev/github-auth',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-control-allow-origin': '*',
        },
        body,
      },
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err));
  };

  //hrllo!

  useEffect(() => {
    console.log('hi');
    setTempToken(searchParams.get('code'));
    console.log('hello');
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
