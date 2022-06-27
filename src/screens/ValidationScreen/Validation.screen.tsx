import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// require('dotenv').config('../../../.env'); //eslint-disable-line

export const Validation: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line
  const [tempToken, setTempToken] = useState<string | null>('');
  const [trueToken, setTrueToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchRealToken = async (token: string) => {
    console.log('hello inside fetch');
    setLoading(true);
    axios
      .post('https://github.com/login/oauth/access_token', {
        body: {
          client_id: '71c6863d3d338f86fe07',
          client_secret: '',
          code: token,
        },
        header: {
          'Access-Control-Allow-Origin': '*',
          Accept: 'application/json',
        },
      })
      .then(res => {
        console.log(res);
        setLoading(false);
        setTrueToken(res.data.access_token);
      });
  };

  useEffect(() => {
    setTempToken(searchParams.get('code'));
    setTimeout(() => tempToken && fetchRealToken(tempToken), 2000);
  }, []);

  useEffect(() => {
    console.log(trueToken);
  }, [trueToken]);

  return (
    <div>
      <h1>Im validating your token, please wait...</h1>
      {loading ? <div>Loading...</div> : null}
    </div>
  );
};
