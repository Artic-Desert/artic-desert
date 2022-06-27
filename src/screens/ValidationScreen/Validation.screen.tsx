import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Validation: React.FC = () => {
  const [tempToken, setTempToken] = useSearchParams(); //eslint-disable-line

  tempToken.get('code');

  useEffect(() => {
    console.log(tempToken);
  }, []);

  return (
    <div>
      <h1>Im validating your token, please wait...</h1>
    </div>
  );
};
