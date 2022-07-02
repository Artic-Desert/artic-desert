import React, { useState, useEffect } from 'react';
import { GiCardRandom } from 'react-icons/gi';
import './RandomQuote.css';

interface Data {
  id: string;
  tags: [];
  content: string;
  author: string;
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export const RandomQuote: React.FC = () => {
  const [data, setData] = useState<Data | null>();
  const [dataError, setDataError] = useState(false);

  async function updateQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setData(data);
      setDataError(false);
    } catch (error) {
      console.error(error);
      setDataError(true);
    }
  }

  useEffect(() => {
    updateQuote();
  }, []);

  if (!data) return null;

  return (
    <div className="random-quote-container">
      <div className="quote-main">
        <p className="quote-main-p">
          {dataError ? 'Oops... Something went wrong' : `"${data.content}"`}
        </p>
        <p className="quote-author"> - {data.author} - </p>
        {/* <br /> */}
      </div>
      <div className="button-container">
        <GiCardRandom className="random-icon" onClick={updateQuote} />
      </div>
    </div>
  );
};
