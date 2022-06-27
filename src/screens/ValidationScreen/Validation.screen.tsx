import axios from 'axios'; //eslint-disable-line
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// require('dotenv').config('../../../.env'); //eslint-disable-line

export const Validation: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line
  //eslint-disable-next-line
  const [tempToken, setTempToken] = useState<string | null>(
    searchParams.get('code'),
  );
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
          'content-type': 'application/json',
          'access-control-allow-origin': '*',
          ':authority': 'p96g6g201b.execute-api.us-east-1.amazonaws.com',
          ':method': 'POST',
          ':path': '/dev/github-auth',
          ':scheme': 'https',
          accept: '*/*',
          'accpet-econding': 'gzip, deflate, br',
          'accept-language':
            'en-ES,en;q=0.9,es-ES;q=0.8,es;q=0.7,en-GB;q=0.6,en-US;q=0.5',
          'content-length': '31',
          origin: 'https://dev.articdesert.click',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
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
