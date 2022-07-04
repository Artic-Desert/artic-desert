// import axios from 'axios';
import React from 'react';
import { AiOutlineGithub } from 'react-icons/ai';
import mask from '../../assets/mask.svg';
import './Welcome.css';

// const pathVariants = {
//   hidden: {
//     opacity: 0,
//     pathLength: 0,
//   },
//   visible: {
//     opacity: 1,
//     pathLength: 1,
//     transition: {
//       duration: 2,
//       ease: 'easeInOut',
//     },
//   },
// };

export const Welcome: React.FC = () => {
  const client_id = '71c6863d3d338f86fe07';

  // const handleLogin = () => {
  //   axios.get(
  //     `https://github.com/login/oauth/authorize?client_id=${client_id}`,
  //   );
  // };

  return (
    <div className="welcome-wrapper">
      <div className="company-name">
        <h1 className="top"> &lt;Arctic </h1>
        <h1 className="bot"> Desert/&gt; </h1>
      </div>
      <div className="main-title">
        <h1>Where Teams Build Software.</h1>
      </div>
      <div className="login-button">
        <a
          className="a-tag"
          href={`https://github.com/login/oauth/authorize?client_id=${client_id}`}>
          <span>Login with GitHub</span>
        </a>
        <AiOutlineGithub fontSize="45px" />
      </div>
      <img className="mask" src={mask} alt="" />
    </div>
  );
};
