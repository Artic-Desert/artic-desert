import React, { useState, useEffect } from 'react';

import './Time.css';

export const Time: React.FC = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 500); // updates state every half seconds
  }, []);

  return (
    <div className="time-container">
      <p className="time-date">
        {dateState
          .toLocaleDateString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
          })
          .split(' ')
          .slice(1)
          .join(' ')}
      </p>
      <p className="time-nums">
        {dateState.toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
    </div>
  );
};
