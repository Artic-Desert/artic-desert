import React, { useState, useEffect } from 'react';

export const RandomQuote: React.FC = () => {
  const [data, setData] = useState(null);

  async function updateQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
    } catch (error) {
      console.error(error);
      setData({ content: 'Oops... Something went wrong' });
    }
  }

  useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div className="random-quote-container">
      <div className="quote-main">
        <p className="quote-main-p">{data.content}</p>
        <p>{data.author}</p>
      </div>
      <div className="button-container">
        <button onClick={updateQuote}>NewQuote</button>
      </div>
    </div>
  );
};
