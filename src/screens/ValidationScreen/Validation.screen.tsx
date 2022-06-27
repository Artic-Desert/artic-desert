import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Validation: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams(); //eslint-disable-line

  useEffect(() => {
    console.log(searchParams.get('code'));
  }, []);

  return (
    <div>
      <h1>Im validating your token, please wait...</h1>
    </div>
  );
};
