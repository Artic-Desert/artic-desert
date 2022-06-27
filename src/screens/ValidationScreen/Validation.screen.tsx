import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const Validation: React.FC = () => {
  const { code } = useParams();

  useEffect(() => {
    console.log(code);
  }, []);

  return (
    <div>
      <h1>Im validating your token, please wait...</h1>
    </div>
  );
};
